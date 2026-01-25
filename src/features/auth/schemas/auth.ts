import { z } from 'zod';
import { MESSAGES } from '@/constants/messages';

export const loginSchema = z.object({
  email: z.email(MESSAGES.validation.invalidFormat('メールアドレス')),
  password: z.string().min(1, MESSAGES.validation.required('パスワード')),
});

export const signupSchema = z
  .object({
    displayName: z
      .string()
      .min(1, MESSAGES.validation.required('表示名'))
      .max(20, MESSAGES.validation.maxLength('表示名', 20)),
    email: z.email(MESSAGES.validation.invalidFormat('メールアドレス')),
    password: z
      .string()
      .min(8, MESSAGES.validation.minLength('パスワード', 8))
      .max(100, MESSAGES.validation.maxLength('パスワード', 100)),
    confirmPassword: z
      .string()
      .min(1, MESSAGES.validation.required('確認用パスワード')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: MESSAGES.validation.mismatch('パスワード'),
    path: ['confirmPassword'],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
