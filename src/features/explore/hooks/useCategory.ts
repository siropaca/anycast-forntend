'use client';

import { useGetCategoriesSlugSuspense } from '@/libs/api/generated/categories/categories';
import type { ResponseCategoryResponse } from '@/libs/api/generated/schemas/responseCategoryResponse';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * slug に一致するカテゴリを取得する
 *
 * @param slug - カテゴリの slug
 * @returns カテゴリ情報
 */
export function useCategory(slug: string) {
  const { data } = useGetCategoriesSlugSuspense(slug);

  const category = unwrapResponse<ResponseCategoryResponse>(data);

  return {
    category,
  };
}
