import { z } from 'zod';
import { MESSAGES } from '@/constants/messages';

const characterSchema = z.object({
  name: z.string().min(1, MESSAGES.validation.required('名前')).max(255),
  voiceId: z.string().min(1, MESSAGES.validation.select('ボイス')),
  persona: z
    .string()
    .max(2000, MESSAGES.validation.maxLength('ペルソナ', 2000))
    .optional(),
});

export const channelFormSchema = z.object({
  name: z
    .string()
    .min(1, MESSAGES.validation.required('チャンネル名'))
    .max(255, MESSAGES.validation.maxLength('チャンネル名', 255)),
  description: z
    .string()
    .max(2000, MESSAGES.validation.maxLength('説明', 2000)),
  userPrompt: z
    .string()
    .max(2000, MESSAGES.validation.maxLength('プロンプト', 2000)),
  categoryId: z.string().min(1, MESSAGES.validation.select('カテゴリ')),
  artworkImageId: z.string().optional(),
  defaultBgmId: z.string().optional(),
  defaultSystemBgmId: z.string().optional(),
  characters: z
    .array(characterSchema)
    .min(1, MESSAGES.validation.minCount('キャラクター', 1))
    .max(2, MESSAGES.validation.maxCount('キャラクター', 2)),
});

export type ChannelFormInput = z.infer<typeof channelFormSchema>;
