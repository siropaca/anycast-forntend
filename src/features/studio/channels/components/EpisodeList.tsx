'use client';

import { useEpisodeList } from '@/features/studio/channels/hooks/useEpisodeList';

interface Props {
  channelId: string;
}

export function EpisodeList({ channelId }: Props) {
  const { episodes } = useEpisodeList(channelId);

  if (episodes.length === 0) {
    return <p>エピソードがありません</p>;
  }

  return (
    <ul>
      {episodes.map((episode) => (
        <li key={episode.id}>{episode.title}</li>
      ))}
    </ul>
  );
}
