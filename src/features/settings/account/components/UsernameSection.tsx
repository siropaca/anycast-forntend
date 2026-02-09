'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { useUpdateUsername } from '@/features/settings/account/hooks/useUpdateUsername';
import {
  type UsernameFormInput,
  usernameFormSchema,
} from '@/features/settings/account/schemas/username';

export function UsernameSection() {
  const { currentUsername, isUpdating, error, updateUsername, clearError } =
    useUpdateUsername();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UsernameFormInput>({
    resolver: zodResolver(usernameFormSchema),
    values: { username: currentUsername },
  });

  function handleFormSubmit(data: UsernameFormInput) {
    clearError();
    updateUsername(data.username);
  }

  return (
    <section className="space-y-4">
      <SectionTitle
        title="ユーザー名"
        description="プロフィールページの URL に使用されます"
        level="h3"
      />

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="space-y-1">
          <FormLabel htmlFor="username">ユーザー名</FormLabel>
          <Input
            id="username"
            maxLength={20}
            showCounter
            error={!!errors.username}
            {...register('username')}
          />
          {errors.username && (
            <HelperText error>{errors.username.message}</HelperText>
          )}
        </div>

        {error && <HelperText error>{error}</HelperText>}

        <Button
          type="submit"
          disabled={!isDirty}
          disabledReason="変更がありません"
          loading={isUpdating}
        >
          保存
        </Button>
      </form>
    </section>
  );
}
