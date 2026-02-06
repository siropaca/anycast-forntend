'use client';

import Link from 'next/link';
import { Suspense, useState } from 'react';

import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { AddToPlaylistModal } from '@/features/episodes/components/AddToPlaylistModal';
import { ChannelEpisodeListItem } from '@/features/episodes/components/ChannelEpisodeListItem';
import { useEpisodePlayer } from '@/features/episodes/hooks/useEpisodePlayer';
import { useNowPlayingEpisodeId } from '@/features/player/hooks/useNowPlayingEpisodeId';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas/responseEpisodeResponse';
import { Pages } from '@/libs/pages';

interface Props {
  episodes: ResponseEpisodeResponse[];
  currentEpisodeId: string;
  channelId: string;
  channelName: string;
}

export function ChannelEpisodeList({
  episodes,
  currentEpisodeId,
  channelId,
  channelName,
}: Props) {
  const otherEpisodes = episodes.filter((ep) => ep.id !== currentEpisodeId);
  const nowPlayingEpisodeId = useNowPlayingEpisodeId();
  const { playEpisode, pauseEpisode } = useEpisodePlayer(channelName);
  const [playlistTargetEpisodeId, setPlaylistTargetEpisodeId] = useState<
    string | null
  >(null);

  if (otherEpisodes.length === 0) {
    return null;
  }

  return (
    <section>
      <SectionTitle
        title="こちらのエピソードもおすすめ"
        action={
          <Link
            href={Pages.channel.path({ channelId })}
            className="text-sm text-primary hover:underline"
          >
            すべて表示
          </Link>
        }
      />

      <div className="mt-2">
        {otherEpisodes.map((ep) => (
          <ChannelEpisodeListItem
            key={ep.id}
            episode={ep}
            channelId={channelId}
            channelName={channelName}
            isPlaying={ep.id === nowPlayingEpisodeId}
            onPlay={() => playEpisode(ep)}
            onPause={pauseEpisode}
            onAddToPlaylist={() => setPlaylistTargetEpisodeId(ep.id)}
          />
        ))}
      </div>

      <Suspense>
        <AddToPlaylistModal
          episodeId={playlistTargetEpisodeId ?? ''}
          currentPlaylistIds={
            otherEpisodes.find((ep) => ep.id === playlistTargetEpisodeId)
              ?.playlistIds ?? []
          }
          open={playlistTargetEpisodeId !== null}
          onOpenChange={(open) => {
            if (!open) setPlaylistTargetEpisodeId(null);
          }}
        />
      </Suspense>
    </section>
  );
}
