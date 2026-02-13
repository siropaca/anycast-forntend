import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import {
  useDeleteChannelsChannelIdEpisodesEpisodeIdBgm,
  usePutChannelsChannelIdEpisodesEpisodeIdBgm,
} from '@/libs/api/generated/episodes/episodes';
import {
  getGetMeBgmsQueryKey,
  getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey,
} from '@/libs/api/generated/me/me';

interface UpdateOptions {
  onSuccess?: () => void;
}

/**
 * エピソードBGMの設定・削除を提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns 設定関数、削除関数、ローディング状態、エラー
 */
export function useUpdateEpisodeBgm(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();
  const setMutation = usePutChannelsChannelIdEpisodesEpisodeIdBgm();
  const deleteMutation = useDeleteChannelsChannelIdEpisodesEpisodeIdBgm();
  const [error, setError] = useState<string>();

  /**
   * クエリキャッシュを無効化する
   */
  function invalidate() {
    queryClient.invalidateQueries({
      queryKey: getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey(
        channelId,
        episodeId,
      ),
    });
    queryClient.invalidateQueries({
      queryKey: getGetMeBgmsQueryKey(),
    });
  }

  /**
   * エピソードBGMを設定する
   *
   * @param bgmId - ユーザーBGM ID（systemBgmId と排他）
   * @param systemBgmId - システムBGM ID（bgmId と排他）
   * @param options - オプション（成功時コールバック）
   */
  function setEpisodeBgm(
    bgmId: string | undefined,
    systemBgmId: string | undefined,
    options?: UpdateOptions,
  ) {
    setError(undefined);

    setMutation.mutate(
      {
        channelId,
        episodeId,
        data: { bgmId, systemBgmId },
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(response.data.error?.message ?? 'BGMの設定に失敗しました');
            return;
          }

          invalidate();
          options?.onSuccess?.();
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error ? err.message : 'BGMの設定に失敗しました';
          setError(message);
        },
      },
    );
  }

  /**
   * エピソードBGMを解除する
   *
   * @param options - オプション（成功時コールバック）
   */
  function removeEpisodeBgm(options?: UpdateOptions) {
    setError(undefined);

    deleteMutation.mutate(
      { channelId, episodeId },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(response.data.error?.message ?? 'BGMの解除に失敗しました');
            return;
          }

          invalidate();
          options?.onSuccess?.();
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error ? err.message : 'BGMの解除に失敗しました';
          setError(message);
        },
      },
    );
  }

  return {
    isUpdating: setMutation.isPending || deleteMutation.isPending,
    error,

    setEpisodeBgm,
    removeEpisodeBgm,
  };
}
