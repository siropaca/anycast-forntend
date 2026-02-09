'use client';

import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import { useToast } from '@/hooks/useToast';
import { usePutEpisodesEpisodeIdPlaylists } from '@/libs/api/generated/episodes/episodes';
import {
  getGetMePlaylistsQueryKey,
  usePostMePlaylists,
} from '@/libs/api/generated/me/me';
import type { ResponsePlaylistResponse } from '@/libs/api/generated/schemas/responsePlaylistResponse';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * 再生リストへのエピソード登録更新・新規再生リスト作成を管理する
 *
 * @returns updatePlaylists, createPlaylist, isPending, error, clearError
 */
export function useAddToPlaylist() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutateAsync: updatePlaylistsMutation, isPending: isUpdating } =
    usePutEpisodesEpisodeIdPlaylists();

  const { mutateAsync: createPlaylistMutation, isPending: isCreating } =
    usePostMePlaylists();

  const [error, setError] = useState<string>();

  /**
   * エピソードの所属再生リストを更新する
   *
   * @param episodeId - 対象エピソードの ID
   * @param playlistIds - 登録先再生リスト ID の配列
   */
  async function updatePlaylists(
    episodeId: string,
    playlistIds: string[],
  ): Promise<boolean> {
    setError(undefined);

    try {
      const response = await updatePlaylistsMutation({
        episodeId,
        data: { playlistIds },
      });

      if (response.status !== StatusCodes.OK) {
        setError(response.data.error.message);
        return false;
      }

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: getGetMePlaylistsQueryKey(),
        }),
        queryClient.invalidateQueries({
          predicate: (query) =>
            typeof query.queryKey[0] === 'string' &&
            query.queryKey[0].startsWith('/me/playlists/'),
        }),
      ]);

      toast.success({ title: '再生リストを更新しました' });
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : '再生リストの更新に失敗しました';
      setError(message);
      return false;
    }
  }

  /**
   * 新しい再生リストを作成する
   *
   * @param name - 再生リスト名
   * @returns 作成された再生リスト
   */
  async function createPlaylist(
    name: string,
  ): Promise<ResponsePlaylistResponse | null> {
    setError(undefined);

    try {
      const response = await createPlaylistMutation({
        data: { name },
      });

      if (response.status !== StatusCodes.CREATED) {
        setError(response.data.error.message);
        return null;
      }

      const playlist = unwrapResponse<ResponsePlaylistResponse>(response);

      await queryClient.invalidateQueries({
        queryKey: getGetMePlaylistsQueryKey(),
      });

      return playlist;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : '再生リストの作成に失敗しました';
      setError(message);
      return null;
    }
  }

  /**
   * エラー状態をクリアする
   */
  function clearError() {
    setError(undefined);
  }

  return {
    updatePlaylists,
    createPlaylist,
    isPending: isUpdating || isCreating,
    error,
    clearError,
  };
}
