import { z } from 'zod';
import { VALIDATION_MESSAGES } from '@/constants/messages';

export const createPlaylistSchema = z.object({
  name: z
    .string()
    .min(1, VALIDATION_MESSAGES.required('再生リスト名'))
    .max(100, VALIDATION_MESSAGES.maxLength('再生リスト名', 100)),
});

export type CreatePlaylistInput = z.infer<typeof createPlaylistSchema>;
