'use client';

import { useGetRecommendationsEpisodesSuspense } from '@/libs/api/generated/recommendations/recommendations';
import type { ResponseRecommendedEpisodeListResponse } from '@/libs/api/generated/schemas/responseRecommendedEpisodeListResponse';
import { unwrapPaginatedResponse } from '@/libs/api/unwrapResponse';

const DEFAULT_LIMIT = 30;

/**
 * カテゴリ slug に紐づくおすすめエピソード一覧を取得する
 *
 * @param categorySlug - カテゴリの slug
 * @returns エピソード一覧
 */
export function useCategoryEpisodes(categorySlug: string) {
  const { data } = useGetRecommendationsEpisodesSuspense({
    categorySlug,
    limit: DEFAULT_LIMIT,
  });

  const response =
    unwrapPaginatedResponse<ResponseRecommendedEpisodeListResponse>(data);

  return {
    episodes: response.data,
  };
}
