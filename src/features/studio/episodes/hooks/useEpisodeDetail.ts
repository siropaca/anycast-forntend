import { useDeleteChannelsChannelIdEpisodesEpisodeId } from '@/libs/api/generated/episodes/episodes';
import { useGetMeChannelsChannelIdEpisodesSuspense } from '@/libs/api/generated/me/me';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * エピソード詳細に必要なデータと操作を提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns エピソードデータ、削除ミューテーション
 */
export function useEpisodeDetail(channelId: string, episodeId: string) {
  const { data: episodesData } =
    useGetMeChannelsChannelIdEpisodesSuspense(channelId);
  const deleteMutation = useDeleteChannelsChannelIdEpisodesEpisodeId();

  const episodes = unwrapResponse<ResponseEpisodeResponse[]>(episodesData, []);
  const episode = episodes.find((e) => e.id === episodeId) ?? null;

  return {
    episode,
    deleteMutation,
  };
}
