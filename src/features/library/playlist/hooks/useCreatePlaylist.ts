import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import { useToast } from '@/hooks/useToast';
import {
  getGetMePlaylistsQueryKey,
  usePostMePlaylists,
} from '@/libs/api/generated/me/me';
import type { ResponsePlaylistResponse } from '@/libs/api/generated/schemas/responsePlaylistResponse';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * プレイリスト作成ミューテーションを提供する
 *
 * @returns 作成関数、作成中フラグ、エラー
 */
export function useCreatePlaylist() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const mutation = usePostMePlaylists();

  const [error, setError] = useState<string>();

  /**
   * 新しいプレイリストを作成する
   *
   * @param name - プレイリスト名
   * @returns 作成されたプレイリスト、失敗時は null
   */
  async function createPlaylist(
    name: string,
  ): Promise<ResponsePlaylistResponse | null> {
    setError(undefined);

    try {
      const response = await mutation.mutateAsync({
        data: { name },
      });

      if (response.status !== StatusCodes.CREATED) {
        const message =
          response.data.error?.message ?? '再生リストの作成に失敗しました';
        setError(message);
        toast.error({ title: message });
        return null;
      }

      const playlist = unwrapResponse<ResponsePlaylistResponse>(response);

      await queryClient.invalidateQueries({
        queryKey: getGetMePlaylistsQueryKey(),
      });

      toast.success({ title: '再生リストを作成しました' });
      return playlist;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : '再生リストの作成に失敗しました';
      setError(message);
      toast.error({ title: message });
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
    isCreating: mutation.isPending,
    error,

    createPlaylist,
    clearError,
  };
}
