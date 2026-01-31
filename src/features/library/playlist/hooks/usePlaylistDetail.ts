'use client';

import { useGetMePlaylistsPlaylistIdSuspense } from '@/libs/api/generated/me/me';
import type { ResponsePlaylistDetailResponse } from '@/libs/api/generated/schemas/responsePlaylistDetailResponse';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * プレイリスト詳細を取得する
 *
 * @param playlistId - プレイリスト ID
 * @returns プレイリスト詳細
 */
export function usePlaylistDetail(playlistId: string) {
  const { data } = useGetMePlaylistsPlaylistIdSuspense(playlistId);

  const playlist = unwrapResponse<ResponsePlaylistDetailResponse>(data);

  return {
    playlist,
  };
}
