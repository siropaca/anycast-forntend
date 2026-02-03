'use client';

import { useGetChannelsChannelIdSuspense } from '@/libs/api/generated/channels/channels';
import type { ResponseChannelResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * チャンネルを取得する
 *
 * @param channelId - チャンネルの ID
 * @returns チャンネル情報
 */
export function useChannel(channelId: string) {
  const { data } = useGetChannelsChannelIdSuspense(channelId);

  const channel = unwrapResponse<ResponseChannelResponse>(data);

  return {
    channel,
  };
}
