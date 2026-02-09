'use client';

import type { ResponseSearchEpisodeListResponse } from '@/libs/api/generated/schemas';
import { useGetSearchEpisodesSuspense } from '@/libs/api/generated/search/search';
import { unwrapPaginatedResponse } from '@/libs/api/unwrapResponse';

const SEARCH_LIMIT = 6;

/**
 * キーワードでエピソードを検索する
 *
 * @param query - 検索キーワード
 * @returns エピソード一覧
 */
export function useSearchEpisodes(query: string) {
  const { data } = useGetSearchEpisodesSuspense({
    q: query,
    limit: SEARCH_LIMIT,
  });

  const response =
    unwrapPaginatedResponse<ResponseSearchEpisodeListResponse>(data);

  return {
    episodes: response.data,
  };
}
