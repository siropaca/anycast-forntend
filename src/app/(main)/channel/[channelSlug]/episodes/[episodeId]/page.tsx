import type { Metadata } from 'next';

import { getChannelsChannelIdEpisodesEpisodeId } from '@/libs/api/generated/episodes/episodes';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

interface Props {
  params: Promise<{ channelSlug: string; episodeId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { channelSlug, episodeId } = await params;
  const response = await getChannelsChannelIdEpisodesEpisodeId(
    channelSlug,
    episodeId,
  );
  const episode = unwrapResponse<ResponseEpisodeResponse>(response);

  return {
    title: episode.title,
  };
}

export default async function EpisodePage({ params }: Props) {
  const { channelSlug, episodeId } = await params;
  const response = await getChannelsChannelIdEpisodesEpisodeId(
    channelSlug,
    episodeId,
  );
  const episode = unwrapResponse<ResponseEpisodeResponse>(response);

  return (
    <div>
      <div>{episode.title}</div>
    </div>
  );
}
