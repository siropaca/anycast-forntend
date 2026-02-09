'use client';

import type { ResponseSearchChannelListResponse } from '@/libs/api/generated/schemas';
import { useGetSearchChannelsSuspense } from '@/libs/api/generated/search/search';
import { unwrapPaginatedResponse } from '@/libs/api/unwrapResponse';

const SEARCH_LIMIT = 6;

/**
 * キーワードでチャンネルを検索する
 *
 * @param query - 検索キーワード
 * @returns チャンネル一覧
 */
export function useSearchChannels(query: string) {
  const { data } = useGetSearchChannelsSuspense({
    q: query,
    limit: SEARCH_LIMIT,
  });

  const response =
    unwrapPaginatedResponse<ResponseSearchChannelListResponse>(data);

  return {
    channels: response.data,
  };
}
