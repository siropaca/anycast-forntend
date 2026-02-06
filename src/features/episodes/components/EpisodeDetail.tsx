'use client';

import {
  ListPlusIcon,
  PauseIcon,
  PlayIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from '@phosphor-icons/react';
import Link from 'next/link';

import { Avatar } from '@/components/dataDisplay/Avatar/Avatar';
import {
  ARTWORK_FIXED_SIZE,
  Artwork,
} from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import { useChannel } from '@/features/channels/hooks/useChannel';
import { useEpisode } from '@/features/episodes/hooks/useEpisode';
import { useEpisodePlayer } from '@/features/episodes/hooks/useEpisodePlayer';
import { useEpisodeReaction } from '@/features/episodes/hooks/useEpisodeReaction';
import { useToast } from '@/hooks/useToast';
import { Pages } from '@/libs/pages';
import { formatDate, formatTime } from '@/utils/date';

const ARTWORK_SIZE = 170;

interface Props {
  channelId: string;
  episodeId: string;
  isLoggedIn?: boolean;
}

export function EpisodeDetail({
  channelId,
  episodeId,
  isLoggedIn = false,
}: Props) {
  const { channel } = useChannel(channelId);
  const { episode } = useEpisode(channelId, episodeId);
  const { isEpisodePlaying, playEpisode, pauseEpisode } = useEpisodePlayer(
    channel.name,
  );
  const { currentReaction, isPending, toggleReaction } =
    useEpisodeReaction(episodeId);

  const playing = isEpisodePlaying(episode);
  const otherEpisodes = channel.episodes.filter((ep) => ep.id !== episodeId);

  function handlePlayClick() {
    if (playing) {
      pauseEpisode();
    } else {
      playEpisode(episode);
    }
  }

  const toast = useToast();

  function handleGoodClick() {
    const isRemoving = currentReaction === 'like';
    toggleReaction('like');
    toast.success({
      title: isRemoving ? '高評価を取り消しました' : '高評価しました',
    });
  }

  function handleBadClick() {
    const isRemoving = currentReaction === 'bad';
    toggleReaction('bad');
    toast.success({
      title: isRemoving ? '低評価を取り消しました' : '低評価しました',
    });
  }

  return (
    <div className="space-y-8">
      {/* ヘッダー: アートワーク + メタ情報 */}
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        <ArtworkImage
          src={episode.artwork?.url}
          alt={episode.title}
          size={ARTWORK_SIZE}
          priority
        />

        <div className="flex flex-col items-center gap-2.5 md:items-start">
          <h1 className="text-2xl font-bold">{episode.title}</h1>

          <p className="text-text-subtle">
            <Link
              href={Pages.channel.path({ channelId })}
              className="hover:underline"
            >
              {channel.name}
            </Link>
            <span className="mx-1">·</span>
            <Link
              href={Pages.exploreCategory.path({
                category: channel.category.slug,
              })}
              className="hover:underline"
            >
              {channel.category.name}
            </Link>
          </p>

          <Link
            href={Pages.user.path({
              username: channel.owner.username,
            })}
            className="flex items-center gap-2 text-sm text-text-subtle hover:underline"
          >
            <Avatar
              src={channel.owner.avatar?.url}
              alt={channel.owner.displayName}
              fallback={channel.owner.displayName.charAt(0)}
              size="sm"
            />
            {channel.owner.displayName}
          </Link>

          <p className="text-sm text-text-subtle">
            {episode.publishedAt && (
              <>
                {formatDate(new Date(episode.publishedAt))}
                <span className="mx-1">·</span>
              </>
            )}
            {episode.fullAudio && (
              <>
                {formatTime(episode.fullAudio.durationMs)}
                <span className="mx-1">·</span>
              </>
            )}
            {episode.playCount}回再生
          </p>
        </div>
      </div>

      {/* アクションバー */}
      <div className="flex items-center gap-4">
        <IconButton
          icon={
            playing ? (
              <PauseIcon size={24} weight="fill" />
            ) : (
              <PlayIcon size={24} weight="fill" />
            )
          }
          aria-label={playing ? '一時停止' : '再生'}
          size="xl"
          color="primary"
          disabled={!episode.fullAudio}
          disabledReason="音声が生成されていません"
          onClick={handlePlayClick}
        />

        {isLoggedIn && (
          <>
            <IconButton
              icon={
                <ThumbsUpIcon
                  size={20}
                  weight={currentReaction === 'like' ? 'fill' : 'regular'}
                />
              }
              aria-label="高評価"
              variant={currentReaction === 'like' ? 'solid' : 'outline'}
              color="primary"
              disabled={isPending}
              onClick={handleGoodClick}
            />
            <IconButton
              icon={
                <ThumbsDownIcon
                  size={20}
                  weight={currentReaction === 'bad' ? 'fill' : 'regular'}
                />
              }
              aria-label="低評価"
              variant={currentReaction === 'bad' ? 'solid' : 'outline'}
              color="primary"
              disabled={isPending}
              onClick={handleBadClick}
            />
          </>
        )}

        <IconButton
          icon={<ListPlusIcon size={26} />}
          aria-label="再生リストに追加"
          variant="text"
          color="primary"
        />
      </div>

      {/* 説明セクション */}
      {episode.description && (
        <section>
          <h2 className="mb-3 text-lg font-bold">説明</h2>
          <p className="whitespace-pre-wrap text-sm text-text-subtle">
            {episode.description}
          </p>
        </section>
      )}

      {/* 同じチャンネルのエピソード */}
      {otherEpisodes.length > 0 && (
        <ContentSection title="同じチャンネルのエピソード">
          {otherEpisodes.map((ep) => (
            <Link
              key={ep.id}
              href={Pages.episode.path({
                channelId,
                episodeId: ep.id,
              })}
            >
              <Artwork
                src={ep.artwork?.url}
                title={ep.title}
                size={ARTWORK_FIXED_SIZE}
                subtext={
                  ep.publishedAt
                    ? formatDate(new Date(ep.publishedAt))
                    : undefined
                }
              />
            </Link>
          ))}
        </ContentSection>
      )}
    </div>
  );
}
