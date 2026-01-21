import { z } from 'zod';

export const scriptLineFormSchema = z.object({
  emotion: z.string(),
  text: z.string().min(1, 'テキストを入力してください'),
});

export type ScriptLineFormInput = z.infer<typeof scriptLineFormSchema>;
