import {
  useDeleteChannelsChannelId,
  usePostChannelsChannelIdPublish,
  usePostChannelsChannelIdUnpublish,
} from '@/libs/api/generated/channels/channels';
import { useGetMeChannelsChannelIdSuspense } from '@/libs/api/generated/me/me';
import type { ResponseChannelResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * チャンネル詳細に必要なデータと操作を提供する
 *
 * @param channelId - チャンネル ID
 * @returns チャンネルデータ、各種ミューテーション
 */
export function useChannelDetail(channelId: string) {
  const { data: response } = useGetMeChannelsChannelIdSuspense(channelId);
  const deleteMutation = useDeleteChannelsChannelId();
  const publishMutation = usePostChannelsChannelIdPublish();
  const unpublishMutation = usePostChannelsChannelIdUnpublish();

  const channel = unwrapResponse<ResponseChannelResponse>(response);

  return {
    channel,
    deleteMutation,
    publishMutation,
    unpublishMutation,
  };
}
