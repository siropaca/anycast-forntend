'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { FormModal } from '@/components/utils/Modal/FormModal';
import {
  type CreatePlaylistInput,
  createPlaylistSchema,
} from '@/features/episodes/schemas/playlist';
import type { useCreatePlaylistModal } from '@/features/library/playlist/hooks/useCreatePlaylistModal';

interface Props {
  createModal: ReturnType<typeof useCreatePlaylistModal>;
}

export function PlaylistCreateModal({ createModal }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreatePlaylistInput>({
    resolver: zodResolver(createPlaylistSchema),
    defaultValues: { name: '' },
  });

  useEffect(() => {
    if (createModal.isOpen) {
      reset({ name: '' });
    }
  }, [createModal.isOpen, reset]);

  const name = watch('name');

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      createModal.close();
    }
  }

  const error = errors.name?.message || createModal.error;

  return (
    <FormModal
      trigger={<span className="hidden" />}
      open={createModal.isOpen}
      title="再生リストを作成"
      submitLabel="作成"
      submitDisabled={!name.trim()}
      submitDisabledReason="再生リスト名を入力してください"
      isSubmitting={createModal.isCreating}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmit((data) => createModal.submit(data.name))}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <FormLabel htmlFor="playlist-create-name" required>
            再生リスト名
          </FormLabel>
          <Input
            id="playlist-create-name"
            placeholder="再生リスト名を入力"
            maxLength={100}
            showCounter
            error={!!errors.name}
            disabled={createModal.isCreating}
            value={name}
            {...register('name')}
          />

          {error && <HelperText error>{error}</HelperText>}
        </div>
      </div>
    </FormModal>
  );
}
