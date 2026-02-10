'use client';

import {
  MusicNoteIcon,
  PencilSimpleIcon,
  UserIcon,
} from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';

import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { ConfirmDialog } from '@/components/utils/Dialog/ConfirmDialog';
import { ChannelDefaultBgmModal } from '@/features/studio/channels/components/ChannelDefaultBgmModal';
import { ChannelDetailMenu } from '@/features/studio/channels/components/ChannelDetailMenu';
import { ChannelPromptModal } from '@/features/studio/channels/components/ChannelPromptModal';
import { StatusTag } from '@/features/studio/channels/components/StatusTag';
import { useChannelDeleteDialog } from '@/features/studio/channels/hooks/useChannelDeleteDialog';
import { useChannelDetail } from '@/features/studio/channels/hooks/useChannelDetail';
import { useChannelPublishDialog } from '@/features/studio/channels/hooks/useChannelPublishDialog';
import { EpisodeList } from '@/features/studio/episodes/components/EpisodeList';
import { VoiceSampleButton } from '@/features/studio/voices/components/VoiceSampleButton';
import { useVoiceList } from '@/features/studio/voices/hooks/useVoiceList';
import { Pages } from '@/libs/pages';

const ARTWORK_SIZE = 170;

interface Props {
  channelId: string;
}

export function ChannelDetail({ channelId }: Props) {
  const router = useRouter();
  const { voices } = useVoiceList();
  const {
    channel,
    isPublished,
    isMutating,
    isDeleting,
    isPublishing,
    isUnpublishing,
    error,
    deleteChannel,
    publishChannel,
    unpublishChannel,
    clearError,
  } = useChannelDetail(channelId);

  const [promptModalOpen, setPromptModalOpen] = useState(false);
  const [bgmModalOpen, setBgmModalOpen] = useState(false);

  const deleteDialog = useChannelDeleteDialog({
    deleteChannel,
    clearError,
    isDeleting,
    error,
  });

  const publishDialog = useChannelPublishDialog({
    publishChannel,
    unpublishChannel,
    clearError,
    isMutating: isPublishing || isUnpublishing,
    error,
  });

  async function handleDeleteConfirm() {
    const success = await deleteDialog.confirm();
    if (success) {
      router.push(Pages.studio.channels.path());
    }
  }

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <SectionTitle
        title={channel.name}
        action={
          <div className="flex items-center gap-3">
            <StatusTag isPublished={isPublished} />
            <Button
              size="sm"
              variant="outline"
              color="secondary"
              leftIcon={<PencilSimpleIcon size={16} />}
              href={Pages.studio.editChannel.path({ id: channelId })}
            >
              編集
            </Button>
            <ChannelDetailMenu
              isPublished={isPublished}
              disabled={isMutating}
              onPublish={() => publishDialog.open('publish')}
              onUnpublish={() => publishDialog.open('unpublish')}
              onDelete={deleteDialog.open}
            />
          </div>
        }
      />

      {/* チャンネル情報 */}
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <ArtworkImage
          src={channel.artwork?.url}
          alt={channel.name}
          size={ARTWORK_SIZE}
          priority
        />

        <div className="flex flex-1 flex-col gap-3">
          <p className="text-sm text-text-subtle">{channel.category.name}</p>

          {channel.description && (
            <p className="whitespace-pre-wrap">{channel.description}</p>
          )}
        </div>
      </div>

      {/* キャラクター */}
      <div className="space-y-3">
        <SectionTitle title="キャラクター" level="h3" />
        <ul className="flex flex-wrap gap-6">
          {channel.characters.map((character) => {
            const voice = voices.find((v) => v.id === character.voice.id);
            return (
              <li key={character.id} className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-bg-elevated text-text-placeholder">
                  <UserIcon size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium">{character.name}</p>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-text-subtle">
                      {character.voice.name}
                    </p>
                    {voice && <VoiceSampleButton voice={voice} />}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* デフォルトBGM */}
      <div className="space-y-3">
        <SectionTitle
          title="デフォルトBGM"
          level="h3"
          action={
            <Button
              size="sm"
              variant="outline"
              color="secondary"
              leftIcon={<PencilSimpleIcon size={16} />}
              onClick={() => setBgmModalOpen(true)}
            >
              編集
            </Button>
          }
        />
        {channel.defaultBgm ? (
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-bg-elevated text-text-placeholder">
              <MusicNoteIcon size={20} />
            </div>
            <p className="text-sm">{channel.defaultBgm.name}</p>
          </div>
        ) : (
          <p className="text-sm text-text-placeholder">未設定</p>
        )}
      </div>

      {/* 台本プロンプト */}
      <div className="space-y-3">
        <SectionTitle
          title="台本プロンプト"
          level="h3"
          action={
            <Button
              size="sm"
              variant="outline"
              color="secondary"
              leftIcon={<PencilSimpleIcon size={16} />}
              onClick={() => setPromptModalOpen(true)}
            >
              編集
            </Button>
          }
        />
        {channel.userPrompt ? (
          <p className="whitespace-pre-wrap text-sm text-text-subtle">
            {channel.userPrompt}
          </p>
        ) : (
          <p className="text-sm text-text-placeholder">未設定</p>
        )}
      </div>

      {/* エピソード一覧 */}
      <div className="space-y-4">
        <Suspense
          fallback={<p className="text-sm text-text-subtle">読み込み中...</p>}
        >
          <EpisodeList channelId={channelId} />
        </Suspense>
      </div>

      {/* デフォルトBGM編集モーダル */}
      {bgmModalOpen && (
        <ChannelDefaultBgmModal
          channelId={channelId}
          currentDefaultBgm={channel.defaultBgm}
          open={bgmModalOpen}
          onOpenChange={setBgmModalOpen}
        />
      )}

      {/* 台本プロンプト編集モーダル */}
      {promptModalOpen && (
        <ChannelPromptModal
          channelId={channelId}
          currentUserPrompt={channel.userPrompt}
          open={promptModalOpen}
          onOpenChange={setPromptModalOpen}
        />
      )}

      {/* 削除ダイアログ */}
      <ConfirmDialog
        trigger={<span className="hidden" />}
        open={deleteDialog.isOpen}
        title="チャンネルを削除"
        description={
          <>
            「{channel.name}」を削除しますか？
            <br />
            この操作は取り消せません。
          </>
        }
        error={deleteDialog.error}
        confirmLabel="削除"
        confirmColor="danger"
        onOpenChange={(open) => !open && deleteDialog.close()}
        onConfirm={handleDeleteConfirm}
      />

      {/* 公開/非公開ダイアログ */}
      <ConfirmDialog
        trigger={<span className="hidden" />}
        open={publishDialog.isOpen}
        title={
          publishDialog.action === 'publish'
            ? 'チャンネルを公開'
            : 'チャンネルを非公開にする'
        }
        description={
          publishDialog.action === 'publish'
            ? `「${channel.name}」を公開しますか？`
            : `「${channel.name}」を非公開にしますか？`
        }
        error={publishDialog.error}
        confirmLabel={
          publishDialog.action === 'publish' ? '公開' : '非公開にする'
        }
        confirmColor={publishDialog.action === 'publish' ? 'primary' : 'danger'}
        onOpenChange={(open) => !open && publishDialog.close()}
        onConfirm={publishDialog.confirm}
      />
    </div>
  );
}
