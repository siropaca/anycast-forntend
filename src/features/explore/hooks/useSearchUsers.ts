'use client';

import type { ResponseSearchUserListResponse } from '@/libs/api/generated/schemas';
import { useGetSearchUsersSuspense } from '@/libs/api/generated/search/search';
import { unwrapPaginatedResponse } from '@/libs/api/unwrapResponse';

const SEARCH_LIMIT = 6;

/**
 * キーワードでユーザーを検索する
 *
 * @param query - 検索キーワード
 * @returns ユーザー一覧
 */
export function useSearchUsers(query: string) {
  const { data } = useGetSearchUsersSuspense({
    q: query,
    limit: SEARCH_LIMIT,
  });

  const response =
    unwrapPaginatedResponse<ResponseSearchUserListResponse>(data);

  return {
    users: response.data,
  };
}
