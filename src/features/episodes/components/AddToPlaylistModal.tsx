'use client';

import { PlusIcon } from '@phosphor-icons/react';
import { type FormEvent, useState } from 'react';

import { Button } from '@/components/inputs/buttons/Button/Button';
import { Checkbox } from '@/components/inputs/Checkbox/Checkbox';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { Modal } from '@/components/utils/Modal/Modal';
import { useAddToPlaylist } from '@/features/episodes/hooks/useAddToPlaylist';
import { usePlaylists } from '@/features/library/playlist/hooks/usePlaylists';

interface Props {
  episodeId: string;
  currentPlaylistIds: string[];
  open: boolean;

  onOpenChange: (open: boolean) => void;
}

export function AddToPlaylistModal({
  episodeId,
  currentPlaylistIds,
  open,
  onOpenChange,
}: Props) {
  const { items: playlists } = usePlaylists();
  const { updatePlaylists, createPlaylist, isPending, error, clearError } =
    useAddToPlaylist();

  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(currentPlaylistIds),
  );
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  function handleCheckboxChange(playlistId: string, checked: boolean) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(playlistId);
      } else {
        next.delete(playlistId);
      }
      return next;
    });
  }

  async function handleCreatePlaylist(e: FormEvent) {
    e.preventDefault();

    const trimmed = newPlaylistName.trim();
    if (!trimmed) return;

    const playlist = await createPlaylist(trimmed);
    if (playlist) {
      setSelectedIds((prev) => new Set(prev).add(playlist.id));
      setNewPlaylistName('');
      setIsCreatingNew(false);
    }
  }

  async function handleSave() {
    const ids = Array.from(selectedIds);

    const success = await updatePlaylists(episodeId, ids);
    if (success) {
      onOpenChange(false);
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      // モーダルを開くときに最新の状態で初期化
      setSelectedIds(new Set(currentPlaylistIds));
      clearError();
    } else {
      setIsCreatingNew(false);
      setNewPlaylistName('');
    }
    onOpenChange(nextOpen);
  }

  return (
    <Modal.Root open={open} onOpenChange={handleOpenChange}>
      <Modal.Content size="sm">
        <Modal.Header>
          <Modal.Title>プレイリストに追加</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body className="space-y-6">
          {/* 既存プレイリスト */}
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
              className="flex cursor-pointer items-center gap-1.5 text-sm text-text-subtle transition-colors hover:text-text-main"
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
