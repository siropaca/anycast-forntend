'use client';

import { useForm } from 'react-hook-form';
import { useUpdateUserPrompt } from '@/features/studio/settings/hooks/useUpdateUserPrompt';

interface FormInput {
  userPrompt: string;
}

export function UserPromptForm() {
  const { currentUserPrompt, updateUserPrompt, isLoading, isUpdating, error } =
    useUpdateUserPrompt();

  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormInput>({
    values: {
      userPrompt: currentUserPrompt,
    },
  });

  function onSubmit(data: FormInput) {
    updateUserPrompt(data.userPrompt);
  }

  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="userPrompt">共通のプロンプト</label>
        <textarea
          id="userPrompt"
          className="border w-full h-40"
          {...register('userPrompt')}
        />
      </div>

      {error && <p>{error}</p>}

      <button
        type="submit"
        className="border"
        disabled={isUpdating || !isDirty}
      >
        {isUpdating ? '保存中...' : '保存'}
      </button>
    </form>
  );
}
