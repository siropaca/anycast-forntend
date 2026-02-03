'use client';

import { useEpisode } from '@/features/episodes/hooks/useEpisode';

interface Props {
  channelId: string;
  episodeId: string;
}

export function EpisodeDetail({ channelId, episodeId }: Props) {
  const { episode } = useEpisode(channelId, episodeId);

  return (
    <div>
      <pre>{JSON.stringify(episode, null, 2)}</pre>
    </div>
  );
}
