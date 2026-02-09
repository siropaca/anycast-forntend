'use client';

import { FormField } from '@/components/inputs/FormField/FormField';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import { FormModal } from '@/components/utils/Modal/FormModal';
import { AvatarImageField } from '@/features/users/components/AvatarImageField';
import { HeaderImageField } from '@/features/users/components/HeaderImageField';
import { useProfileForm } from '@/features/users/hooks/useProfileForm';
import type { ResponsePublicUserResponse } from '@/libs/api/generated/schemas';
import { confirmDiscard } from '@/utils/confirmDiscard';

interface Props {
  user: ResponsePublicUserResponse;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserProfileEditModal({ user, open, onOpenChange }: Props) {
  const {
    form,
    avatarField,
    headerField,
    isUploading,
    isUpdating,
    updateError,
    resetAll,
    submit,
  } = useProfileForm(user, open, () => onOpenChange(false));

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = form;

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen && !confirmDiscard(isDirty)) return;

    onOpenChange(isOpen);
    if (!isOpen) {
      resetAll();
    }
  }

  function handleHeaderFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) headerField.upload(file);
  }

  function handleAvatarFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) avatarField.upload(file);
  }

  return (
    <FormModal
      trigger={<span className="hidden" />}
      open={open}
      title="プロフィールを編集"
      size="lg"
      submitLabel="保存"
      submitDisabled={!isDirty || isUpdating || isUploading}
      submitDisabledReason={
        isUploading ? '画像アップロード中...' : '変更がありません'
      }
      isSubmitting={isUpdating}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmit(submit)}
    >
      <div className="space-y-6">
        <HeaderImageField
          previewUrl={headerField.previewUrl}
          fileInputRef={headerField.fileInputRef}
          isUploading={headerField.isUploading}
          error={headerField.error}
          onOpenFilePicker={headerField.openFilePicker}
          onFileChange={handleHeaderFileChange}
          onRemove={headerField.remove}
        />

        <AvatarImageField
          previewUrl={avatarField.previewUrl}
          fileInputRef={avatarField.fileInputRef}
          isUploading={avatarField.isUploading}
          error={avatarField.error}
          onOpenFilePicker={avatarField.openFilePicker}
          onFileChange={handleAvatarFileChange}
          onRemove={avatarField.remove}
        />

        {/* 表示名 */}
        <FormField label="表示名" required error={errors.displayName?.message}>
          {({ id, hasError }) => (
            <Input
              id={id}
              placeholder="表示名を入力"
              maxLength={20}
              disabled={isUpdating}
              error={hasError}
              {...register('displayName')}
            />
          )}
        </FormField>

        {/* 自己紹介 */}
        <FormField label="自己紹介" error={errors.bio?.message}>
          {({ id, hasError }) => (
            <Textarea
              id={id}
              placeholder="自己紹介を入力"
              rows={5}
              maxLength={200}
              showCounter
              disabled={isUpdating}
              error={hasError}
              value={watch('bio')}
              {...register('bio')}
            />
          )}
        </FormField>

        {updateError && <HelperText error>{updateError}</HelperText>}
      </div>
    </FormModal>
  );
}
