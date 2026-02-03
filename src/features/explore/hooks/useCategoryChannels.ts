'use client';

import { useGetRecommendationsChannelsSuspense } from '@/libs/api/generated/recommendations/recommendations';
import type { ResponseRecommendedChannelListResponse } from '@/libs/api/generated/schemas/responseRecommendedChannelListResponse';
import { unwrapPaginatedResponse } from '@/libs/api/unwrapResponse';

const DEFAULT_LIMIT = 30;

/**
 * カテゴリ slug に紐づくおすすめチャンネル一覧を取得する
 *
 * @param categorySlug - カテゴリの slug
 * @returns チャンネル一覧
 */
export function useCategoryChannels(categorySlug: string) {
  const { data } = useGetRecommendationsChannelsSuspense({
    categorySlug,
    limit: DEFAULT_LIMIT,
  });

  const response =
    unwrapPaginatedResponse<ResponseRecommendedChannelListResponse>(data);

  return {
    channels: response.data,
  };
}
