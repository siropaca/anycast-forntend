'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  type ScriptGenerateFormInput,
  scriptGenerateFormSchema,
} from '@/features/studio/episodes/schemas/scriptGenerate';

interface Props {
  isSubmitting?: boolean;
  error?: string;

  onSubmit: (data: ScriptGenerateFormInput) => void;
}

export function ScriptGenerateForm({
  isSubmitting = false,
  error,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScriptGenerateFormInput>({
    resolver: zodResolver(scriptGenerateFormSchema),
    defaultValues: {
      prompt: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <textarea
          className="border w-full"
          placeholder="どんな内容のポッドキャストを作成しますか？"
          disabled={isSubmitting}
          {...register('prompt')}
        />
        {errors.prompt && (
          <p className="text-red-500">{errors.prompt.message}</p>
        )}
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button type="submit" className="border" disabled={isSubmitting}>
        {isSubmitting ? '生成中...' : '台本を作成'}
      </button>
    </form>
  );
}
