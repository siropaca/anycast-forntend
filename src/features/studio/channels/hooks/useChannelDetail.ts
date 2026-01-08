import { useQueryClient } from '@tanstack/react-query';
import {
  useDeleteChannelsChannelId,
  usePostChannelsChannelIdPublish,
  usePostChannelsChannelIdUnpublish,
} from '@/libs/api/generated/channels/channels';
import {
  getGetMeChannelsChannelIdQueryKey,
  getGetMeChannelsQueryKey,
  useGetMeChannelsChannelIdSuspense,
} from '@/libs/api/generated/me/me';
import type { ResponseChannelResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * チャンネル詳細に必要なデータと操作を提供する
 *
 * @param channelId - チャンネル ID
 * @returns チャンネルデータ、各種ミューテーション
 */
export function useChannelDetail(channelId: string) {
  const queryClient = useQueryClient();

  const { data: response } = useGetMeChannelsChannelIdSuspense(channelId);

  const deleteMutation = useDeleteChannelsChannelId({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetMeChannelsQueryKey(),
        });
      },
    },
  });

  const publishMutation = usePostChannelsChannelIdPublish({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetMeChannelsChannelIdQueryKey(channelId),
        });
      },
    },
  });

  const unpublishMutation = usePostChannelsChannelIdUnpublish({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetMeChannelsChannelIdQueryKey(channelId),
        });
      },
    },
  });

  const channel = unwrapResponse<ResponseChannelResponse>(response);

  const isPublished = !!channel.publishedAt;
  const isMutating =
    deleteMutation.isPending ||
    publishMutation.isPending ||
    unpublishMutation.isPending;

  return {
    channel,
    isPublished,
    isMutating,
    deleteMutation,
    publishMutation,
    unpublishMutation,
  };
}
