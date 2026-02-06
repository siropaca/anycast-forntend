'use client';

import { type FormEvent, useEffect, useRef, useState } from 'react';

import { useAddToPlaylist } from '@/features/episodes/hooks/useAddToPlaylist';
import { useGetMePlaylists } from '@/libs/api/generated/me/me';
import type { ResponsePlaylistListWithPaginationResponse } from '@/libs/api/generated/schemas/responsePlaylistListWithPaginationResponse';
import { unwrapPaginatedResponse } from '@/libs/api/unwrapResponse';

interface UseAddToPlaylistFormParams {
  episodeId: string;
  currentPlaylistIds: string[];
  open: boolean;

  onClose: () => void;
}

/**
 * プレイリスト追加モーダルのフォーム状態を管理する
 *
 * @param params - エピソードID、現在のプレイリストID、モーダル開閉状態、閉じるコールバック
 * @returns フォームの状態とハンドラー
 */
export function useAddToPlaylistForm({
  episodeId,
  currentPlaylistIds,
  open,
  onClose,
}: UseAddToPlaylistFormParams) {
  const { data, isLoading } = useGetMePlaylists({ limit: 100 });
  const playlists = data
    ? unwrapPaginatedResponse<ResponsePlaylistListWithPaginationResponse>(data)
        .data
    : [];

  const { updatePlaylists, createPlaylist, isPending, error, clearError } =
    useAddToPlaylist();

  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(currentPlaylistIds),
  );
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const prevOpenRef = useRef(open);

  useEffect(() => {
    if (open && !prevOpenRef.current) {
      setSelectedIds(new Set(currentPlaylistIds));
      setIsCreatingNew(false);
      setNewPlaylistName('');
      clearError();
    }
    prevOpenRef.current = open;
  }, [open, currentPlaylistIds, clearError]);

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
      onClose();
    }
  }

  return {
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
  };
}
