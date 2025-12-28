import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('有効なメールアドレスを入力してください'),
  password: z.string().min(1, 'パスワードを入力してください'),
});

export const signupSchema = z
  .object({
    displayName: z
      .string()
      .min(1, '表示名を入力してください')
      .max(20, '表示名は20文字以内で入力してください'),
    email: z.email('有効なメールアドレスを入力してください'),
    password: z
      .string()
      .min(8, 'パスワードは8文字以上で入力してください')
      .max(100, 'パスワードは100文字以内で入力してください'),
    confirmPassword: z.string().min(1, '確認用パスワードを入力してください'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードが一致しません',
    path: ['confirmPassword'],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
