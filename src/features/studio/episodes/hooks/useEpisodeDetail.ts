import { useQueryClient } from '@tanstack/react-query';
import {
  useDeleteChannelsChannelIdEpisodesEpisodeId,
  usePostChannelsChannelIdEpisodesEpisodeIdPublish,
  usePostChannelsChannelIdEpisodesEpisodeIdUnpublish,
} from '@/libs/api/generated/episodes/episodes';
import {
  getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey,
  getGetMeChannelsChannelIdEpisodesQueryKey,
  useGetMeChannelsChannelIdEpisodesEpisodeIdSuspense,
} from '@/libs/api/generated/me/me';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * エピソード詳細に必要なデータと操作を提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns エピソードデータ、各種ミューテーション
 */
export function useEpisodeDetail(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();

  const { data: response } = useGetMeChannelsChannelIdEpisodesEpisodeIdSuspense(
    channelId,
    episodeId,
  );

  const deleteMutation = useDeleteChannelsChannelIdEpisodesEpisodeId({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetMeChannelsChannelIdEpisodesQueryKey(channelId),
        });
      },
    },
  });

  const publishMutation = usePostChannelsChannelIdEpisodesEpisodeIdPublish({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey(
            channelId,
            episodeId,
          ),
        });
      },
    },
  });

  const unpublishMutation = usePostChannelsChannelIdEpisodesEpisodeIdUnpublish({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey(
            channelId,
            episodeId,
          ),
        });
      },
    },
  });

  const episode = unwrapResponse<ResponseEpisodeResponse>(response);

  const isPublished = !!episode.publishedAt;
  const isMutating =
    deleteMutation.isPending ||
    publishMutation.isPending ||
    unpublishMutation.isPending;

  return {
    episode,
    isPublished,
    isMutating,
    deleteMutation,
    publishMutation,
    unpublishMutation,
  };
}
