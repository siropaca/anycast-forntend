'use client';

import { useEffect, useRef, useState } from 'react';

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
 * 再生リスト追加モーダルのフォーム状態を管理する
 *
 * @param params - エピソードID、現在の再生リストID、モーダル開閉状態、閉じるコールバック
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

  const prevOpenRef = useRef(open);
  const savedIdsRef = useRef<string[] | null>(null);

  const defaultPlaylistId = playlists.find((p) => p.isDefault)?.id;

  useEffect(() => {
    if (open && !prevOpenRef.current) {
      const ids = savedIdsRef.current ?? currentPlaylistIds;
      const initialIds =
        ids.length === 0 && defaultPlaylistId ? [defaultPlaylistId] : ids;
      setSelectedIds(new Set(initialIds));
      setIsCreatingNew(false);
      clearError();
    }
    prevOpenRef.current = open;
  }, [open, currentPlaylistIds, defaultPlaylistId, clearError]);

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

  /**
   * 新しい再生リストを作成し、選択状態に追加する
   *
   * @param name - 再生リスト名
   */
  async function handleCreatePlaylist(name: string) {
    const playlist = await createPlaylist(name);
    if (playlist) {
      setSelectedIds((prev) => new Set(prev).add(playlist.id));
      setIsCreatingNew(false);
    }
  }

  async function handleSave() {
    const ids = Array.from(selectedIds);

    const success = await updatePlaylists(episodeId, ids);
    if (success) {
      savedIdsRef.current = ids;
      onClose();
    }
  }

  return {
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
  };
}
