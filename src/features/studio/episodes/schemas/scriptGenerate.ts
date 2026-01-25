import { z } from 'zod';
import { MESSAGES } from '@/constants/messages';

/**
 * エピソードの長さ（分）
 */
export const EPISODE_DURATION_OPTIONS = [5, 10, 15] as const;

export const scriptGenerateFormSchema = z.object({
  prompt: z
    .string()
    .max(2000, MESSAGES.validation.maxLength('プロンプト', 2000)),
  durationMinutes: z.number({
    message: MESSAGES.validation.select('エピソードの長さ'),
  }),
});

export type ScriptGenerateFormInput = z.infer<typeof scriptGenerateFormSchema>;
