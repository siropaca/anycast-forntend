'use client';

import type { ReactNode } from 'react';

import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { AddToPlaylistModal } from '@/features/episodes/components/AddToPlaylistModal';
import { ChannelEpisodeListItem } from '@/features/episodes/components/ChannelEpisodeListItem';
import { useEpisodePlayer } from '@/features/episodes/hooks/useEpisodePlayer';
import { usePlaylistTarget } from '@/features/episodes/hooks/usePlaylistTarget';
import { useNowPlayingEpisodeId } from '@/features/player/hooks/useNowPlayingEpisodeId';
import { toTrackFromEpisode } from '@/features/player/utils/trackConverter';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas/responseEpisodeResponse';

interface Props {
  episodes: ResponseEpisodeResponse[];
  channelId: string;
  channelName: string;
  title: string;
  action?: ReactNode;
  excludeEpisodeId?: string;
  emptyMessage?: string;
  showChannelName?: boolean;
}

export function ChannelEpisodeList({
  episodes,
  channelId,
  channelName,
  title,
  action,
  excludeEpisodeId,
  emptyMessage,
  showChannelName = true,
}: Props) {
  const displayEpisodes = excludeEpisodeId
    ? episodes.filter((ep) => ep.id !== excludeEpisodeId)
    : episodes;

  const nowPlayingEpisodeId = useNowPlayingEpisodeId();
  const { playEpisode, pauseEpisode } = useEpisodePlayer(channelName);
  const playlistTarget = usePlaylistTarget(displayEpisodes);

  const queue = displayEpisodes
    .filter((ep) => ep.fullAudio != null)
    .map((ep) => toTrackFromEpisode(ep, channelName));

  if (displayEpisodes.length === 0) {
    if (!emptyMessage) return null;

    return (
      <section>
        <SectionTitle title={title} />
        <p className="py-8 text-center text-sm text-text-subtle">
          {emptyMessage}
        </p>
      </section>
    );
  }

  return (
    <section>
      <SectionTitle title={title} action={action} />

      <div>
        {displayEpisodes.map((ep) => (
          <ChannelEpisodeListItem
            key={ep.id}
            episode={ep}
            channelId={channelId}
            channelName={showChannelName ? channelName : undefined}
            isPlaying={ep.id === nowPlayingEpisodeId}
            onPlay={() => playEpisode(ep, queue)}
            onPause={pauseEpisode}
            onAddToPlaylist={() => playlistTarget.open(ep.id)}
          />
        ))}
      </div>

      <AddToPlaylistModal
        open={playlistTarget.isOpen}
        episodeId={playlistTarget.episodeId}
        currentPlaylistIds={playlistTarget.currentPlaylistIds}
        onOpenChange={(open) => {
          if (!open) playlistTarget.close();
        }}
      />
    </section>
  );
}
