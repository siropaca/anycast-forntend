import { z } from 'zod';
import { VALIDATION_MESSAGES } from '@/constants/messages';

export const passwordFormSchema = z
  .object({
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(8, VALIDATION_MESSAGES.minLength('新しいパスワード', 8))
      .max(100, VALIDATION_MESSAGES.maxLength('新しいパスワード', 100)),
    confirmPassword: z
      .string()
      .min(1, VALIDATION_MESSAGES.required('確認用パスワード')),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: VALIDATION_MESSAGES.mismatch('パスワード'),
    path: ['confirmPassword'],
  });

export type PasswordFormInput = z.infer<typeof passwordFormSchema>;
