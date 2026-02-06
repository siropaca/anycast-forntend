import { getChannelsChannelId } from '@/libs/api/generated/channels/channels';
import { getChannelsChannelIdEpisodesEpisodeId } from '@/libs/api/generated/episodes/episodes';
import type {
  ResponseChannelResponse,
  ResponseEpisodeResponse,
} from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';
import { auth } from '@/libs/auth/auth';

import { ChannelEpisodeList } from './ChannelEpisodeList';
import { EpisodeActionBar } from './EpisodeActionBar';
import { EpisodeHeader } from './EpisodeHeader';

interface Props {
  channelId: string;
  episodeId: string;
}

export async function EpisodeDetail({ channelId, episodeId }: Props) {
  const [channelResponse, episodeResponse, { isLoggedIn }] = await Promise.all([
    getChannelsChannelId(channelId),
    getChannelsChannelIdEpisodesEpisodeId(channelId, episodeId),
    auth(),
  ]);
  const channel = unwrapResponse<ResponseChannelResponse>(channelResponse);
  const episode = unwrapResponse<ResponseEpisodeResponse>(episodeResponse);

  return (
    <div className="space-y-8">
      <EpisodeHeader
        episode={episode}
        channel={channel}
        channelId={channelId}
      />

      <EpisodeActionBar
        episode={episode}
        channelName={channel.name}
        isLoggedIn={isLoggedIn}
      />

      {/* 説明セクション */}
      <section>
        <h2 className="mb-3 text-lg font-bold">説明</h2>
        <p className="whitespace-pre-wrap text-sm text-text-subtle">
          {episode.description || '説明はありません'}
        </p>
      </section>

      <ChannelEpisodeList
        episodes={channel.episodes}
        currentEpisodeId={episode.id}
        channelId={channelId}
        channelName={channel.name}
      />
    </div>
  );
}
