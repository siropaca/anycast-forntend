import { useState } from 'react';
import { useGetMeCharactersSuspense } from '@/libs/api/generated/me/me';
import type {
  ResponseCharacterListWithPaginationResponse,
  ResponsePaginationResponse,
} from '@/libs/api/generated/schemas';
import { unwrapPaginatedResponse } from '@/libs/api/unwrapResponse';

const DEFAULT_LIMIT = 20;

const DEFAULT_PAGINATION: ResponsePaginationResponse = {
  limit: DEFAULT_LIMIT,
  offset: 0,
  total: 0,
};

const DEFAULT_RESPONSE: ResponseCharacterListWithPaginationResponse = {
  data: [],
  pagination: DEFAULT_PAGINATION,
};

/**
 * 自分のキャラクター一覧をページネーション付きで取得する
 *
 * @returns キャラクター一覧とページネーション情報
 */
export function useMyCharacterList() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetMeCharactersSuspense({
    limit: DEFAULT_LIMIT,
    offset: (currentPage - 1) * DEFAULT_LIMIT,
  });

  const response =
    unwrapPaginatedResponse<ResponseCharacterListWithPaginationResponse>(
      data,
      DEFAULT_RESPONSE,
    );

  const totalPages = Math.ceil(response.pagination.total / DEFAULT_LIMIT);

  return {
    characters: response.data,
    currentPage,
    totalPages,

    setCurrentPage,
  };
}
