'use client';

import { PlusIcon } from '@phosphor-icons/react';

import { Spinner } from '@/components/feedback/Spinner/Spinner';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { Checkbox } from '@/components/inputs/Checkbox/Checkbox';
import { Modal } from '@/components/utils/Modal/Modal';
import { CreatePlaylistForm } from '@/features/episodes/components/CreatePlaylistForm';
import { useAddToPlaylistForm } from '@/features/episodes/hooks/useAddToPlaylistForm';

interface Props {
  open: boolean;
  episodeId: string;
  currentPlaylistIds: string[];

  onOpenChange: (open: boolean) => void;
}

export function AddToPlaylistModal({
  open,
  episodeId,
  currentPlaylistIds,
  onOpenChange,
}: Props) {
  const {
    playlists,
    isLoading,
    selectedIds,
    isCreatingNew,
    isPending,
    error,
    setIsCreatingNew,
    handleCheckboxChange,
    handleCreatePlaylist,
    handleSave,
  } = useAddToPlaylistForm({
    episodeId,
    currentPlaylistIds,
    open,
    onClose: () => onOpenChange(false),
  });

  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Content size="sm">
        <Modal.Header>
          <Modal.Title>再生リストに追加</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <Spinner />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {playlists.map((playlist) => (
                <Checkbox
                  key={playlist.id}
                  label={playlist.name}
                  checked={selectedIds.has(playlist.id)}
                  onChange={(e) =>
                    handleCheckboxChange(playlist.id, e.target.checked)
                  }
                />
              ))}
            </div>
          )}

          {isCreatingNew ? (
            <CreatePlaylistForm
              isPending={isPending}
              serverError={error}
              onSubmit={handleCreatePlaylist}
            />
          ) : (
            // 再生リスト作成ボタン
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1.5 text-sm text-primary transition-colors hover:text-primary-hover"
              onClick={() => setIsCreatingNew(true)}
            >
              <PlusIcon size={16} />
              新しい再生リストを作成
            </button>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Modal.Close>
            <Button variant="outline" color="secondary">
              キャンセル
            </Button>
          </Modal.Close>

          <Button loading={isPending} onClick={handleSave}>
            保存
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
