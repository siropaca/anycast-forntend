'use client';

import { useGetRecommendationsEpisodesSuspense } from '@/libs/api/generated/recommendations/recommendations';
import type { ResponseRecommendedEpisodeListResponse } from '@/libs/api/generated/schemas/responseRecommendedEpisodeListResponse';
import type { ResponseRecommendedEpisodeResponse } from '@/libs/api/generated/schemas/responseRecommendedEpisodeResponse';
import { unwrapPaginatedResponse } from '@/libs/api/unwrapResponse';

const DEFAULT_LIMIT = 20;

/**
 * おすすめエピソード一覧を取得する
 *
 * @returns おすすめエピソード一覧
 */
export function useRecommendedEpisodes() {
  const { data } = useGetRecommendationsEpisodesSuspense({
    limit: DEFAULT_LIMIT,
  });

  const response =
    unwrapPaginatedResponse<ResponseRecommendedEpisodeListResponse>(data);

  return { episodes: response.data };
}

/**
 * おすすめエピソードのアートワーク URL を取得する
 *
 * エピソード自体のアートワークがない場合、チャンネルのアートワークにフォールバックする。
 *
 * @param episode - おすすめエピソード
 * @returns アートワーク URL（存在しない場合は undefined）
 */
export function getEpisodeArtworkUrl(
  episode: ResponseRecommendedEpisodeResponse,
): string | undefined {
  return episode.artwork?.url ?? episode.channel.artwork?.url ?? undefined;
}
