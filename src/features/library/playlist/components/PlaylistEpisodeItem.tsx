'use client';

import Link from 'next/link';
import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { useNowPlayingEpisodeId } from '@/features/player/hooks/useNowPlayingEpisodeId';
import { usePlayEpisode } from '@/features/player/hooks/usePlayEpisode';
import type { ResponsePlaylistItemResponse } from '@/libs/api/generated/schemas/responsePlaylistItemResponse';
import { Pages } from '@/libs/pages';

interface Props {
  item: ResponsePlaylistItemResponse;
  priority: boolean;
}

export function PlaylistEpisodeItem({ item, priority }: Props) {
  const nowPlayingEpisodeId = useNowPlayingEpisodeId();
  const { isEpisodePlaying, playOrResume, pauseEpisode } = usePlayEpisode();
  const { episode } = item;

  function handlePlayClick() {
    if (isEpisodePlaying(episode.id)) {
      pauseEpisode();
    } else {
      playOrResume(episode);
    }
  }

  return (
    <Link
      href={Pages.episode.path({
        channelId: episode.channel.id,
        episodeId: episode.id,
      })}
    >
      <Artwork
        src={episode.artwork?.url}
        title={episode.title}
        subtext={episode.channel.name}
        priority={priority}
        isPlaying={episode.id === nowPlayingEpisodeId}
        onPlayClick={episode.fullAudio ? handlePlayClick : undefined}
      />
    </Link>
  );
}
