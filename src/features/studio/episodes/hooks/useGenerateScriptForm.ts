import { useQueryClient } from '@tanstack/react-query';
import {
  getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey,
  usePostChannelsChannelIdEpisodesEpisodeIdScriptGenerate,
} from '@/libs/api/generated/script/script';

/**
 * 台本生成フォーム用のミューテーションを提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns 台本生成ミューテーション
 */
export function useGenerateScriptForm(channelId: string, episodeId: string) {
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

  return {
    generateMutation,
  };
}
