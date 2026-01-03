'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChannelForm } from '@/features/studio/channels/components/ChannelForm';
import type { ChannelFormInput } from '@/features/studio/channels/schemas/channel';
import { useGetCategoriesSuspense } from '@/libs/api/generated/categories/categories';
import {
  useGetChannelsChannelIdSuspense,
  usePatchChannelsChannelId,
} from '@/libs/api/generated/channels/channels';
import type {
  ResponseCategoryResponse,
  ResponseChannelResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';
import { useGetVoicesSuspense } from '@/libs/api/generated/voices/voices';
import { unwrapResponse } from '@/libs/api/unwrapResponse';
import { Pages } from '@/libs/pages';

interface Props {
  channelId: string;
}

export function EditChannel({ channelId }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { data: channelData } = useGetChannelsChannelIdSuspense(channelId);
  const { data: categoriesData } = useGetCategoriesSuspense();
  const { data: voicesData } = useGetVoicesSuspense();
  const updateMutation = usePatchChannelsChannelId();

  const channel = unwrapResponse<ResponseChannelResponse | null>(
    channelData,
    null,
  );
  const categories = unwrapResponse<ResponseCategoryResponse[]>(
    categoriesData,
    [],
  );
  const voices = unwrapResponse<ResponseVoiceResponse[]>(voicesData, []);

  if (!channel) {
    return <p>チャンネルが見つかりません</p>;
  }

  const defaultValues: ChannelFormInput = {
    name: channel.name,
    description: channel.description,
    scriptPrompt: channel.scriptPrompt,
    categoryId: channel.category.id,
    characters: channel.characters.map((c) => ({
      name: c.name,
      voiceId: c.voice.id,
      persona: c.persona ?? '',
    })),
  };

  /**
   * フォーム送信時のハンドラ
   *
   * @param data - フォームの入力値
   */
  async function handleSubmit(data: ChannelFormInput) {
    setError(null);

    try {
      const response = await updateMutation.mutateAsync({
        channelId,
        data: {
          name: data.name,
          description: data.description,
          scriptPrompt: data.scriptPrompt,
          categoryId: data.categoryId,
        },
      });

      if (response.status !== 200) {
        setError(
          response.data.error?.message ?? 'チャンネルの更新に失敗しました',
        );
        return;
      }

      router.push(Pages.studio.channel.path({ id: channelId }));
    } catch {
      setError('チャンネルの更新に失敗しました');
    }
  }

  return (
    <div>
      <h1>{Pages.studio.editChannel.title}</h1>

      {error && <p>{error}</p>}

      <ChannelForm
        mode="edit"
        defaultValues={defaultValues}
        categories={categories}
        voices={voices}
        onSubmit={handleSubmit}
        isSubmitting={updateMutation.isPending}
      />
    </div>
  );
}
