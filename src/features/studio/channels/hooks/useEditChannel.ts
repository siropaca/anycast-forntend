import { useChannelFormData } from '@/features/studio/channels/hooks/useChannelFormData';
import type { ChannelFormInput } from '@/features/studio/channels/schemas/channel';
import {
  useGetChannelsChannelIdSuspense,
  usePatchChannelsChannelId,
} from '@/libs/api/generated/channels/channels';
import type { ResponseChannelResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * チャンネル編集に必要なデータと操作を提供する
 *
 * @param channelId - チャンネル ID
 * @returns チャンネルデータ、フォームデータ、更新ミューテーション
 */
export function useEditChannel(channelId: string) {
  const { data: channelData } = useGetChannelsChannelIdSuspense(channelId);
  const { categories, voices } = useChannelFormData();
  const updateMutation = usePatchChannelsChannelId();

  const channel = unwrapResponse<ResponseChannelResponse | null>(
    channelData,
    null,
  );

  const defaultValues: ChannelFormInput | null = channel
    ? {
        name: channel.name,
        description: channel.description,
        scriptPrompt: channel.scriptPrompt,
        categoryId: channel.category.id,
        characters: channel.characters.map((c) => ({
          name: c.name,
          voiceId: c.voice.id,
          persona: c.persona ?? '',
        })),
      }
    : null;

  return {
    channel,
    defaultValues,
    categories,
    voices,
    updateMutation,
  };
}
