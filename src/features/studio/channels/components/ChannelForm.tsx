'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon, TrashIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { FormField } from '@/components/inputs/FormField/FormField';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { Select } from '@/components/inputs/Select/Select';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import {
  type ChannelFormInput,
  channelFormSchema,
} from '@/features/studio/channels/schemas/channel';
import { useUploadArtwork } from '@/hooks/useUploadArtwork';
import type {
  ResponseCategoryResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';

interface Props {
  mode: 'create' | 'edit';
  defaultValues?: ChannelFormInput;
  categories: ResponseCategoryResponse[];
  voices: ResponseVoiceResponse[];
  defaultArtworkUrl?: string;
  isSubmitting?: boolean;
  submitError?: string;

  onSubmit: (data: ChannelFormInput) => void;
}

export function ChannelForm({
  mode,
  defaultValues,
  categories,
  voices,
  defaultArtworkUrl,
  onSubmit,
  isSubmitting = false,
  submitError,
}: Props) {
  const {
    uploadArtwork,
    isUploading: isArtworkUploading,
    error: artworkUploadError,
  } = useUploadArtwork();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ChannelFormInput>({
    resolver: zodResolver(channelFormSchema),
    defaultValues: defaultValues ?? {
      name: '',
      description: '',
      categoryId: '',
      characters: [{ name: '', voiceId: '', persona: '' }],
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [artworkPreviewUrl, setArtworkPreviewUrl] = useState<
    string | undefined
  >(defaultArtworkUrl);

  const isEditMode = mode === 'edit';

  function handleArtworkButtonClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    uploadArtwork(file, ({ id, url }) => {
      setValue('artworkImageId', id, { shouldDirty: true });
      setArtworkPreviewUrl(url);
    });
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'characters',
  });

  const categoryOptions = categories.map((category) => ({
    label: category.name ?? '',
    value: category.id ?? '',
  }));

  const voiceOptions = voices.map((voice) => ({
    label: `${voice.name} (${voice.gender})`,
    value: voice.id ?? '',
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* チャンネル基本情報 */}
      <div className="space-y-6">
        <FormField label="チャンネル名" required error={errors.name?.message}>
          {({ id, hasError }) => (
            <Input
              id={id}
              maxLength={255}
              error={hasError}
              {...register('name')}
            />
          )}
        </FormField>

        <FormField label="説明" error={errors.description?.message}>
          {({ id, hasError }) => (
            <Textarea
              id={id}
              rows={4}
              maxLength={2000}
              showCounter
              error={hasError}
              {...register('description')}
            />
          )}
        </FormField>

        <FormField label="アートワーク" error={artworkUploadError}>
          {() => (
            <>
              {artworkPreviewUrl && (
                <Image
                  src={artworkPreviewUrl}
                  alt="アートワーク"
                  width={200}
                  height={200}
                  className="rounded-lg object-cover"
                />
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <div>
                <Button
                  type="button"
                  variant="outline"
                  color="secondary"
                  loading={isArtworkUploading}
                  onClick={handleArtworkButtonClick}
                >
                  {artworkPreviewUrl
                    ? 'アートワークを変更'
                    : 'アートワークを登録'}
                </Button>
              </div>
            </>
          )}
        </FormField>

        <FormField label="カテゴリ" required error={errors.categoryId?.message}>
          {({ hasError }) => (
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  name="categoryId"
                  options={categoryOptions}
                  value={field.value || null}
                  onValueChange={(value) => field.onChange(value ?? '')}
                  placeholder="選択してください"
                  error={hasError}
                />
              )}
            />
          )}
        </FormField>
      </div>

      {/* キャラクター（新規作成時のみ） */}
      {!isEditMode && (
        <div className="space-y-6">
          <SectionTitle title="キャラクター" level="h3" />

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="space-y-4 rounded-lg border border-border-default p-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold">キャラクター {index + 1}</h4>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="text"
                    color="danger"
                    size="sm"
                    leftIcon={<TrashIcon />}
                    onClick={() => remove(index)}
                  >
                    削除
                  </Button>
                )}
              </div>

              <FormField
                label="ボイス"
                required
                error={errors.characters?.[index]?.voiceId?.message}
              >
                {({ hasError }) => (
                  <Controller
                    name={`characters.${index}.voiceId`}
                    control={control}
                    render={({ field: selectField }) => (
                      <Select
                        name={`characters.${index}.voiceId`}
                        options={voiceOptions}
                        value={selectField.value || null}
                        onValueChange={(value) =>
                          selectField.onChange(value ?? '')
                        }
                        placeholder="選択してください"
                        error={hasError}
                      />
                    )}
                  />
                )}
              </FormField>

              <FormField
                label="名前"
                required
                error={errors.characters?.[index]?.name?.message}
              >
                {({ id, hasError }) => (
                  <Input
                    id={id}
                    maxLength={255}
                    error={hasError}
                    {...register(`characters.${index}.name`)}
                  />
                )}
              </FormField>

              <FormField label="ペルソナ">
                {({ id }) => (
                  <Textarea
                    id={id}
                    rows={4}
                    maxLength={2000}
                    showCounter
                    {...register(`characters.${index}.persona`)}
                  />
                )}
              </FormField>
            </div>
          ))}

          {fields.length < 2 && (
            <Button
              type="button"
              variant="outline"
              color="secondary"
              leftIcon={<PlusIcon />}
              onClick={() => append({ name: '', voiceId: '', persona: '' })}
            >
              キャラクターを追加
            </Button>
          )}

          {errors.characters?.root && (
            <HelperText error>{errors.characters.root.message}</HelperText>
          )}
        </div>
      )}

      {/* 送信 */}
      <div className="space-y-4">
        {submitError && <HelperText error>{submitError}</HelperText>}
        <Button type="submit" loading={isSubmitting}>
          {isEditMode ? 'チャンネルを更新' : 'チャンネルを作成'}
        </Button>
      </div>
    </form>
  );
}
