'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChannelForm } from '@/features/studio/channels/components/ChannelForm';
import type { ChannelFormInput } from '@/features/studio/channels/schemas/channel';
import { useGetCategoriesSuspense } from '@/libs/api/generated/categories/categories';
import { usePostChannels } from '@/libs/api/generated/channels/channels';
import type {
  ResponseCategoryResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';
import { useGetVoicesSuspense } from '@/libs/api/generated/voices/voices';
import { unwrapResponse } from '@/libs/api/unwrapResponse';
import { Pages } from '@/libs/pages';

export function CreateChannel() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { data: categoriesData } = useGetCategoriesSuspense();
  const { data: voicesData } = useGetVoicesSuspense();
  const createMutation = usePostChannels();

  const categories = unwrapResponse<ResponseCategoryResponse[]>(
    categoriesData,
    [],
  );
  const voices = unwrapResponse<ResponseVoiceResponse[]>(voicesData, []);

  /**
   * フォーム送信時のハンドラ
   *
   * @param data - フォームの入力値
   */
  async function handleSubmit(data: ChannelFormInput) {
    setError(null);

    try {
      const response = await createMutation.mutateAsync({
        data: {
          name: data.name,
          description: data.description,
          scriptPrompt: data.scriptPrompt,
          categoryId: data.categoryId,
          characters: data.characters.map((c) => ({
            name: c.name,
            voiceId: c.voiceId,
            persona: c.persona,
          })),
        },
      });

      if (response.status !== 201) {
        setError(
          response.data.error?.message ?? 'チャンネルの作成に失敗しました',
        );
        return;
      }

      const channelId = response.data.data?.id;
      if (channelId) {
        router.push(Pages.studio.channel.path({ id: channelId }));
      }
    } catch {
      setError('チャンネルの作成に失敗しました');
    }
  }

  return (
    <div>
      <h1>{Pages.studio.newChannel.title}</h1>

      {error && <p>{error}</p>}

      <ChannelForm
        mode="create"
        categories={categories}
        voices={voices}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending}
      />
    </div>
  );
}
