'use client';

import { PlusIcon, SpinnerGapIcon } from '@phosphor-icons/react';

import { Button } from '@/components/inputs/buttons/Button/Button';
import { Checkbox } from '@/components/inputs/Checkbox/Checkbox';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { Modal } from '@/components/utils/Modal/Modal';
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
    newPlaylistName,
    isPending,
    error,
    setNewPlaylistName,
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
          <Modal.Title>プレイリストに追加</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <SpinnerGapIcon
                size={24}
                className="animate-spin text-text-subtle"
              />
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
            // プレイリスト作成
            <form onSubmit={handleCreatePlaylist} className="space-y-3">
              <div className="flex gap-3">
                <Input
                  size="sm"
                  placeholder="プレイリスト名"
                  value={newPlaylistName}
                  maxLength={100}
                  autoFocus
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={!newPlaylistName.trim() || isPending}
                  loading={isPending}
                >
                  作成
                </Button>
              </div>

              {error && <HelperText error>{error}</HelperText>}
            </form>
          ) : (
            // プレイリスト作成ボタン
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1.5 text-sm text-primary transition-colors hover:text-primary-hover"
              onClick={() => setIsCreatingNew(true)}
            >
              <PlusIcon size={16} />
              新しいプレイリストを作成
            </button>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Modal.Close>
            <Button variant="outline" color="secondary">
              キャンセル
            </Button>
          </Modal.Close>

          <Button onClick={handleSave} loading={isPending}>
            保存
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
