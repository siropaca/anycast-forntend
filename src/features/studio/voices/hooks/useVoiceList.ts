import type {
  GetVoicesParams,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';
import { useGetVoicesSuspense } from '@/libs/api/generated/voices/voices';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * ボイス一覧を取得する
 *
 * @param params - フィルタパラメータ
 * @returns ボイス一覧
 */
export function useVoiceList(params?: GetVoicesParams) {
  const { data } = useGetVoicesSuspense(params);
  const voices = unwrapResponse<ResponseVoiceResponse[]>(data, []);

  return {
    voices,
  };
}
