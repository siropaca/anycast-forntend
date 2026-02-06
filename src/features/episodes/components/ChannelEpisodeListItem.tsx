'use client';

import { ListPlusIcon, PauseIcon, PlayIcon } from '@phosphor-icons/react';
import Link from 'next/link';

import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas/responseEpisodeResponse';
import { Pages } from '@/libs/pages';
import { formatDateJP, formatDuration } from '@/utils/date';

interface Props {
  episode: ResponseEpisodeResponse;
  channelId: string;
  channelName: string;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onAddToPlaylist: () => void;
}

export function ChannelEpisodeListItem({
  episode,
  channelId,
  channelName,
  isPlaying,
  onPlay,
  onPause,
  onAddToPlaylist,
}: Props) {
  const durationMs = episode.fullAudio?.durationMs;

  function handlePlayClick() {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  }

  return (
    <div className="flex gap-4 border-b border-border py-4 last:border-b-0">
      <Link
        href={Pages.episode.path({ channelId, episodeId: episode.id })}
        className="shrink-0"
      >
        <ArtworkImage
          src={episode.artwork?.url}
          alt={episode.title}
          size={100}
          isPlaying={isPlaying}
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="space-y-1">
          <Link
            href={Pages.episode.path({ channelId, episodeId: episode.id })}
          >
            <h3 className="text-sm font-bold leading-snug">
              {isPlaying && (
                <span className="mr-1.5 inline-block size-2 rounded-full bg-primary align-middle" />
              )}
              {episode.title}
            </h3>
          </Link>
          <p className="text-xs text-text-subtle">{channelName}</p>
          {episode.description && (
            <p className="line-clamp-3 text-xs text-text-subtle">
              {episode.description}
            </p>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {episode.publishedAt && (
              <span className="text-xs text-text-subtle">
                {formatDateJP(new Date(episode.publishedAt))}
              </span>
            )}
            {episode.publishedAt && durationMs != null && (
              <span className="text-xs text-text-subtle">&bull;</span>
            )}
            {durationMs != null && (
              <span className="text-xs text-text-subtle">
                {formatDuration(durationMs)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <IconButton
              icon={<ListPlusIcon size={20} />}
              aria-label="プレイリストに追加"
              size="sm"
              variant="text"
              color="secondary"
              onClick={onAddToPlaylist}
            />
            <IconButton
              icon={
                isPlaying ? (
                  <PauseIcon size={18} weight="fill" />
                ) : (
                  <PlayIcon size={18} weight="fill" />
                )
              }
              aria-label={isPlaying ? '一時停止' : '再生'}
              size="sm"
              color="primary"
              disabled={!episode.fullAudio}
              disabledReason="音声が生成されていません"
              onClick={handlePlayClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
