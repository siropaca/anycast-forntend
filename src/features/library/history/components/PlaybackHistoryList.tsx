'use client';

import Link from 'next/link';
import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { PlaybackHistoryDeleteDialog } from '@/features/library/history/components/PlaybackHistoryDeleteDialog';
import { PlaybackHistoryMenu } from '@/features/library/history/components/PlaybackHistoryMenu';
import { usePlaybackHistory } from '@/features/library/history/hooks/usePlaybackHistory';
import { usePlaybackHistoryDeleteDialog } from '@/features/library/history/hooks/usePlaybackHistoryDeleteDialog';
import { useNowPlayingEpisodeId } from '@/features/player/hooks/useNowPlayingEpisodeId';
import { Pages } from '@/libs/pages';

export function PlaybackHistoryList() {
  const { items } = usePlaybackHistory();
  const nowPlayingEpisodeId = useNowPlayingEpisodeId();
  const deleteDialog = usePlaybackHistoryDeleteDialog();

  return (
    <div>
      <SectionTitle
        title={Pages.library.history.pageTitle}
        action={
          items.length > 0 ? (
            <PlaybackHistoryMenu onDelete={deleteDialog.open} />
          ) : undefined
        }
      />

      {items.length === 0 ? (
        <p className="py-12 text-center text-text-subtle">
          再生履歴はありません
        </p>
      ) : (
        <ArtworkGrid>
          {items.map((item, index) => (
            <Link
              key={item.episode.id}
              href={Pages.episode.path({
                channelId: item.episode.channel.id,
                episodeId: item.episode.id,
              })}
            >
              <Artwork
                src={item.episode.channel.artwork?.url}
                title={item.episode.title}
                subtext={item.episode.channel.name}
                priority={index < 6}
                isPlaying={item.episode.id === nowPlayingEpisodeId}
              />
            </Link>
          ))}
        </ArtworkGrid>
      )}

      <PlaybackHistoryDeleteDialog
        open={deleteDialog.isOpen}
        error={deleteDialog.error}
        onClose={deleteDialog.close}
        onConfirm={deleteDialog.confirm}
      />
    </div>
  );
}
