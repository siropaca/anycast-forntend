import { z } from 'zod';
import { VALIDATION_MESSAGES } from '@/constants/messages';

export const usernameFormSchema = z.object({
  username: z
    .string()
    .min(3, VALIDATION_MESSAGES.minLength('ユーザー名', 3))
    .max(20, VALIDATION_MESSAGES.maxLength('ユーザー名', 20)),
});

export type UsernameFormInput = z.infer<typeof usernameFormSchema>;
