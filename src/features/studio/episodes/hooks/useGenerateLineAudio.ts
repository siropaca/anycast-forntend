import { useQueryClient } from '@tanstack/react-query';
import {
  getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey,
  usePostChannelsChannelIdEpisodesEpisodeIdScriptLinesLineIdAudioGenerate,
} from '@/libs/api/generated/script/script';

/**
 * 台本行の音声生成ミューテーションを提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns 音声生成ミューテーション
 */
export function useGenerateLineAudio(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();

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
    generateAudioMutation,
  };
}
