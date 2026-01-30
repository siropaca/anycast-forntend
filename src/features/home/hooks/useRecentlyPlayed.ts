'use client';

import { useGetMePlaybackHistorySuspense } from '@/libs/api/generated/me/me';
import type { ResponsePlaybackHistoryListWithPaginationResponse } from '@/libs/api/generated/schemas/responsePlaybackHistoryListWithPaginationResponse';
import { unwrapPaginatedResponse } from '@/libs/api/unwrapResponse';

const DEFAULT_LIMIT = 20;

/**
 * 最近聴いたコンテンツ一覧を取得する
 *
 * @returns 再生履歴一覧
 */
export function useRecentlyPlayed() {
  const { data } = useGetMePlaybackHistorySuspense({
    limit: DEFAULT_LIMIT,
  });

  const response =
    unwrapPaginatedResponse<ResponsePlaybackHistoryListWithPaginationResponse>(
      data,
    );

  return {
    items: response.data,
  };
}
