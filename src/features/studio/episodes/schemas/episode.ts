import { z } from 'zod';

export const episodeFormSchema = z.object({
  title: z
    .string()
    .min(1, 'タイトルを入力してください')
    .max(255, 'タイトルは255文字以内で入力してください'),
  description: z.string().optional(),
  scriptPrompt: z.string().min(1, '台本プロンプトを入力してください'),
  publishedAt: z.string().optional(),
});

export type EpisodeFormInput = z.infer<typeof episodeFormSchema>;
