import { z } from 'zod';
import { VALIDATION_MESSAGES } from '@/constants/messages';

export const CONTACT_CATEGORY_OPTIONS = [
  { label: '不具合の報告', value: 'bug' },
  { label: '機能のリクエスト', value: 'feature' },
  { label: 'アカウントについて', value: 'account' },
  { label: 'その他', value: 'other' },
] as const;

type CategoryValue = (typeof CONTACT_CATEGORY_OPTIONS)[number]['value'];

const categoryValues = CONTACT_CATEGORY_OPTIONS.map(
  (option) => option.value,
) as [CategoryValue, ...CategoryValue[]];

export const contactSchema = z.object({
  category: z.enum(categoryValues, {
    error: VALIDATION_MESSAGES.select('カテゴリ'),
  }),
  content: z
    .string()
    .min(1, VALIDATION_MESSAGES.required('お問い合わせ内容'))
    .max(1000, VALIDATION_MESSAGES.maxLength('お問い合わせ内容', 1000)),
});

export type ContactInput = z.infer<typeof contactSchema>;
