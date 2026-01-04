'use client';

import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { useChannelDetail } from '@/features/studio/channels/hooks/useChannelDetail';
import { EpisodeList } from '@/features/studio/episodes/components/EpisodeList';
import { getGetMeChannelsChannelIdQueryKey } from '@/libs/api/generated/me/me';
import { Pages } from '@/libs/pages';

interface Props {
  channelId: string;
}

export function ChannelDetail({ channelId }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { channel, deleteMutation, publishMutation, unpublishMutation } =
    useChannelDetail(channelId);
  const [error, setError] = useState<string | undefined>(undefined);

  const isPublished = !!channel.publishedAt;
  const isMutating =
    deleteMutation.isPending ||
    publishMutation.isPending ||
    unpublishMutation.isPending;

  function handleEditClick() {
    router.push(Pages.studio.editChannel.path({ id: channelId }));
  }

  async function handleDeleteClick() {
    setError(undefined);

    try {
      const response = await deleteMutation.mutateAsync({ channelId });

      if (response.status !== StatusCodes.NO_CONTENT) {
        setError(
          response.data.error?.message ?? 'チャンネルの削除に失敗しました',
        );
        return;
      }

      router.push(Pages.studio.channels.path());
    } catch {
      setError('チャンネルの削除に失敗しました');
    }
  }

  /**
   * チャンネルを即時公開する
   */
  async function handlePublishClick() {
    setError(undefined);

    try {
      const response = await publishMutation.mutateAsync({
        channelId,
        data: {},
      });

      if (response.status !== StatusCodes.OK) {
        setError(
          response.data.error?.message ?? 'チャンネルの公開に失敗しました',
        );
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: getGetMeChannelsChannelIdQueryKey(channelId),
      });
    } catch {
      setError('チャンネルの公開に失敗しました');
    }
  }

  /**
   * チャンネルを非公開にする
   */
  async function handleUnpublishClick() {
    setError(undefined);

    try {
      const response = await unpublishMutation.mutateAsync({
        channelId,
      });

      if (response.status !== StatusCodes.OK) {
        setError(
          response.data.error?.message ?? 'チャンネルの非公開に失敗しました',
        );
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: getGetMeChannelsChannelIdQueryKey(channelId),
      });
    } catch {
      setError('チャンネルの非公開に失敗しました');
    }
  }

  return (
    <div>
      <div>
        <Link href={Pages.studio.channels.path()} className="underline">
          チャンネルリストへ戻る
        </Link>
      </div>

      <h1>{Pages.studio.channel.title}</h1>
      <p>チャンネル名: {channel.name}</p>
      {channel.description && <p>説明: {channel.description}</p>}
      <p>公開日時: {channel.publishedAt ?? '非公開'}</p>

      {error && <p>{error}</p>}

      <button
        type="button"
        className="border"
        disabled={isMutating}
        onClick={handleEditClick}
      >
        チャンネルを編集
      </button>

      <button
        type="button"
        className="border"
        disabled={isMutating}
        onClick={handleDeleteClick}
      >
        {deleteMutation.isPending ? '削除中...' : 'チャンネルを削除'}
      </button>

      {isPublished ? (
        <button
          type="button"
          className="border"
          disabled={isMutating}
          onClick={handleUnpublishClick}
        >
          {unpublishMutation.isPending
            ? '非公開にしています...'
            : '非公開にする'}
        </button>
      ) : (
        <button
          type="button"
          className="border"
          disabled={isMutating}
          onClick={handlePublishClick}
        >
          {publishMutation.isPending ? '公開しています...' : 'チャンネルを公開'}
        </button>
      )}

      <hr className="my-4" />

      <h2>エピソード一覧</h2>
      <Suspense fallback={<p>読み込み中...</p>}>
        <EpisodeList channelId={channelId} />
      </Suspense>
    </div>
  );
}
