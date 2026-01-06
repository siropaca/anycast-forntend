import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import {
  getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey,
  useDeleteChannelsChannelIdEpisodesEpisodeIdScriptLinesLineId,
} from '@/libs/api/generated/script/script';

/**
 * 台本行の削除ミューテーションを提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns 削除ミューテーション
 */
export function useDeleteScriptLine(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();

  const deleteLineMutation =
    useDeleteChannelsChannelIdEpisodesEpisodeIdScriptLinesLineId({
      mutation: {
        onSuccess: (response) => {
          if (response.status === StatusCodes.NO_CONTENT) {
            queryClient.invalidateQueries({
              queryKey:
                getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey(
                  channelId,
                  episodeId,
                ),
            });
          }
        },
      },
    });

  return {
    deleteLineMutation,
  };
}
