import { z } from 'zod';
import { MESSAGES } from '@/constants/messages';

export const episodeFormSchema = z.object({
  title: z
    .string()
    .min(1, MESSAGES.validation.required('タイトル'))
    .max(255, MESSAGES.validation.maxLength('タイトル', 255)),
  description: z
    .string()
    .max(2000, MESSAGES.validation.maxLength('説明', 2000)),
  artworkImageId: z.string().optional(),
});

export type EpisodeFormInput = z.infer<typeof episodeFormSchema>;
