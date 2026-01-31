'use client';

import { useGetMeFollowsSuspense } from '@/libs/api/generated/me/me';
import type { ResponseFollowListWithPaginationResponse } from '@/libs/api/generated/schemas/responseFollowListWithPaginationResponse';
import { unwrapPaginatedResponse } from '@/libs/api/unwrapResponse';

const DEFAULT_LIMIT = 20;

/**
 * お気に入りのユーザー一覧を取得する
 *
 * @returns お気に入りのユーザー一覧
 */
export function useFavoriteUsers() {
  const { data } = useGetMeFollowsSuspense({
    limit: DEFAULT_LIMIT,
  });

  const response =
    unwrapPaginatedResponse<ResponseFollowListWithPaginationResponse>(data);

  return {
    items: response.data,
  };
}
