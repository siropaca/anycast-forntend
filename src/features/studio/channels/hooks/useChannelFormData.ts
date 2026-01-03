import { useGetCategoriesSuspense } from '@/libs/api/generated/categories/categories';
import type {
  ResponseCategoryResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';
import { useGetVoicesSuspense } from '@/libs/api/generated/voices/voices';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * チャンネルフォームで使用するカテゴリとボイスのデータを取得する
 *
 * @returns カテゴリ一覧とボイス一覧
 */
export function useChannelFormData() {
  const { data: categoriesData } = useGetCategoriesSuspense();
  const { data: voicesData } = useGetVoicesSuspense();

  const categories = unwrapResponse<ResponseCategoryResponse[]>(
    categoriesData,
    [],
  );
  const voices = unwrapResponse<ResponseVoiceResponse[]>(voicesData, []);

  return { categories, voices };
}
