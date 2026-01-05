import { useQueryClient } from '@tanstack/react-query';
import {
  getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey,
  usePostChannelsChannelIdEpisodesEpisodeIdScriptGenerate,
  usePostChannelsChannelIdEpisodesEpisodeIdScriptLinesLineIdAudioGenerate,
} from '@/libs/api/generated/script/script';

/**
 * 台本生成・音声生成のミューテーションを提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns 台本生成・音声生成ミューテーション
 */
export function useGenerateScript(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();

  const generateMutation =
    usePostChannelsChannelIdEpisodesEpisodeIdScriptGenerate({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey:
              getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey(
                channelId,
                episodeId,
              ),
          });
        },
      },
    });

  const generateAudioMutation =
    usePostChannelsChannelIdEpisodesEpisodeIdScriptLinesLineIdAudioGenerate({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey:
              getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey(
                channelId,
                episodeId,
              ),
          });
        },
      },
    });

  return {
    generateMutation,
    generateAudioMutation,
  };
}
