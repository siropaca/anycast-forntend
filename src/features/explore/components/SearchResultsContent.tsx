'use client';

import Link from 'next/link';

import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import { useSearchChannels } from '@/features/explore/hooks/useSearchChannels';
import { useSearchEpisodes } from '@/features/explore/hooks/useSearchEpisodes';
import { useSearchUsers } from '@/features/explore/hooks/useSearchUsers';
import { ARTWORK_SIZE } from '@/features/home/constants/layout';
import { useNowPlayingEpisodeId } from '@/features/player/hooks/useNowPlayingEpisodeId';
import { Pages } from '@/libs/pages';

interface Props {
  query: string;
}

export function SearchResultsContent({ query }: Props) {
  const { episodes } = useSearchEpisodes(query);
  const { channels } = useSearchChannels(query);
  const { users } = useSearchUsers(query);
  const nowPlayingEpisodeId = useNowPlayingEpisodeId();

  const hasNoResults =
    episodes.length === 0 && channels.length === 0 && users.length === 0;

  if (hasNoResults) {
    return (
      <div className="mt-4 flex items-center justify-center py-20">
        <p className="text-sm text-text-subtle">
          検索結果が見つかりませんでした
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-6">
      {episodes.length > 0 && (
        <ContentSection title="エピソード" level="h3">
          {episodes.map((episode) => (
            <Link
              key={episode.id}
              href={Pages.episode.path({
                channelId: episode.channel.id,
                episodeId: episode.id,
              })}
            >
              <Artwork
                title={episode.title}
                subtext={episode.channel.name}
                size={ARTWORK_SIZE}
                isPlaying={episode.id === nowPlayingEpisodeId}
              />
            </Link>
          ))}
        </ContentSection>
      )}

      {channels.length > 0 && (
        <ContentSection title="チャンネル" level="h3">
          {channels.map((channel) => (
            <Link
              key={channel.id}
              href={Pages.channel.path({ channelId: channel.id })}
            >
              <Artwork
                src={channel.artwork?.url}
                title={channel.name}
                subtext={channel.category.name}
                size={ARTWORK_SIZE}
              />
            </Link>
          ))}
        </ContentSection>
      )}

      {users.length > 0 && (
        <ContentSection title="ユーザー" level="h3">
          {users.map((user) => (
            <Link
              key={user.id}
              href={Pages.user.path({ username: user.username })}
            >
              <Artwork
                src={user.avatar?.url}
                title={user.displayName}
                subtext={`@${user.username}`}
                size={ARTWORK_SIZE}
                rounded
              />
            </Link>
          ))}
        </ContentSection>
      )}
    </div>
  );
}
