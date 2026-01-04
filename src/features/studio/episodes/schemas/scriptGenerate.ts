import { z } from 'zod';

export const scriptGenerateFormSchema = z.object({
  prompt: z
    .string()
    .min(1, 'プロンプトを入力してください')
    .max(2000, 'プロンプトは2000文字以内で入力してください'),
});

export type ScriptGenerateFormInput = z.infer<typeof scriptGenerateFormSchema>;
