'use client';

import { FormField } from '@/components/inputs/FormField/FormField';
import { Input } from '@/components/inputs/Input/Input';
import { FormModal } from '@/components/utils/Modal/FormModal';
import type { usePlaylistEditModal } from '@/features/library/playlist/hooks/usePlaylistEditModal';

interface Props {
  editModal: ReturnType<typeof usePlaylistEditModal>;
}

export function PlaylistEditModal({ editModal }: Props) {
  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      editModal.close();
    }
  }

  return (
    <FormModal
      trigger={<span className="hidden" />}
      open={editModal.isOpen}
      title="再生リストを編集"
      submitLabel="保存"
      submitDisabled={!editModal.name.trim() || !editModal.isDirty}
      submitDisabledReason={
        !editModal.name.trim()
          ? '再生リスト名を入力してください'
          : '変更がありません'
      }
      isSubmitting={editModal.isUpdating}
      onOpenChange={handleOpenChange}
      onSubmit={editModal.submit}
    >
      <div className="space-y-6">
        <FormField label="再生リスト名" required error={editModal.error}>
          {({ id }) => (
            <Input
              id={id}
              value={editModal.name}
              placeholder="再生リスト名を入力"
              disabled={editModal.isUpdating}
              onChange={(e) => editModal.setName(e.target.value)}
            />
          )}
        </FormField>
      </div>
    </FormModal>
  );
}
