import { useQueryClient } from '@tanstack/react-query';
import { usePostChannelsChannelIdEpisodes } from '@/libs/api/generated/episodes/episodes';
import { getGetMeChannelsChannelIdEpisodesQueryKey } from '@/libs/api/generated/me/me';

/**
 * エピソード作成に必要なデータと操作を提供する
 *
 * @param channelId - チャンネル ID
 * @returns 作成ミューテーション
 */
export function useCreateEpisode(channelId: string) {
  const queryClient = useQueryClient();

  const createMutation = usePostChannelsChannelIdEpisodes({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetMeChannelsChannelIdEpisodesQueryKey(channelId),
        });
      },
    },
  });

  return {
    createMutation,
  };
}
