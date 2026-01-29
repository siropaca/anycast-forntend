import { useState } from 'react';
import { useGetMeChannelsSuspense } from '@/libs/api/generated/me/me';
import type {
  ResponseChannelListWithPaginationResponse,
  ResponsePaginationResponse,
} from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

const DEFAULT_LIMIT = 20;

const DEFAULT_PAGINATION: ResponsePaginationResponse = {
  limit: DEFAULT_LIMIT,
  offset: 0,
  total: 0,
};

/**
 * 自分のチャンネル一覧を取得する
 *
 * @returns チャンネル一覧とページネーション情報
 */
export function useMyChannelList() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetMeChannelsSuspense({
    limit: DEFAULT_LIMIT,
    offset: (currentPage - 1) * DEFAULT_LIMIT,
  });

  const response = unwrapResponse<ResponseChannelListWithPaginationResponse>(
    data,
    { data: [], pagination: DEFAULT_PAGINATION },
  );

  const totalPages = Math.ceil(response.pagination.total / DEFAULT_LIMIT);

  return {
    channels: response.data,
    pagination: response.pagination,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
