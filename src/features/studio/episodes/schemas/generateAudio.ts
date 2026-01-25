import { z } from 'zod';
import { MESSAGES } from '@/constants/messages';

export const generateAudioFormSchema = z.object({
  voiceStyle: z
    .string()
    .max(500, MESSAGES.validation.maxLength('音声スタイル', 500)),
});

export type GenerateAudioFormInput = z.infer<typeof generateAudioFormSchema>;
