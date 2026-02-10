import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import { usePutChannelsChannelIdUserPrompt } from '@/libs/api/generated/channels/channels';
import { getGetMeChannelsChannelIdQueryKey } from '@/libs/api/generated/me/me';

interface UpdateOptions {
  onSuccess?: () => void;
}

/**
 * チャンネルの台本プロンプトの更新を提供する
 *
 * @param channelId - チャンネル ID
 * @param currentUserPrompt - 現在の台本プロンプト
 * @returns 更新関数、ローディング状態、エラー
 */
export function useUpdateChannelPrompt(
  channelId: string,
  currentUserPrompt: string,
) {
  const queryClient = useQueryClient();
  const mutation = usePutChannelsChannelIdUserPrompt();
  const [error, setError] = useState<string>();

  /**
   * チャンネルの台本プロンプトを更新する
   *
   * @param userPrompt - 新しい台本プロンプト
   * @param options - オプション（成功時コールバック）
   */
  function updatePrompt(userPrompt: string, options?: UpdateOptions) {
    setError(undefined);

    mutation.mutate(
      {
        channelId,
        data: { userPrompt },
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(
              response.data.error?.message ??
                '台本プロンプトの更新に失敗しました',
            );
            return;
          }

          queryClient.invalidateQueries({
            queryKey: getGetMeChannelsChannelIdQueryKey(channelId),
          });
          options?.onSuccess?.();
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error
              ? err.message
              : '台本プロンプトの更新に失敗しました';
          setError(message);
        },
      },
    );
  }

  return {
    currentUserPrompt,
    isUpdating: mutation.isPending,
    error,

    updatePrompt,
  };
}
