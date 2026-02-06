'use client';

import { PauseIcon, PlayIcon } from '@phosphor-icons/react';

import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { useEpisodePlayer } from '@/features/episodes/hooks/useEpisodePlayer';
import { toTrackFromEpisode } from '@/features/player/utils/trackConverter';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas/responseEpisodeResponse';

interface Props {
  episodes: ResponseEpisodeResponse[];
  channelName: string;
}

export function ChannelActionBar({ episodes, channelName }: Props) {
  const { isEpisodePlaying, playEpisode, pauseEpisode } =
    useEpisodePlayer(channelName);

  const playableEpisodes = episodes.filter((ep) => ep.fullAudio != null);
  const firstEpisode = playableEpisodes[0];
  const hasPlayableEpisode = firstEpisode != null;
  const playing = firstEpisode != null && isEpisodePlaying(firstEpisode);

  function handlePlayClick() {
    if (!firstEpisode) return;

    if (playing) {
      pauseEpisode();
    } else {
      const queue = playableEpisodes.map((ep) =>
        toTrackFromEpisode(ep, channelName),
      );
      playEpisode(firstEpisode, queue);
    }
  }

  return (
    <div className="flex items-center gap-6">
      <IconButton
        icon={
          playing ? (
            <PauseIcon size={24} weight="fill" />
          ) : (
            <PlayIcon size={24} weight="fill" />
          )
        }
        aria-label={playing ? '一時停止' : '再生'}
        size="xl"
        color="primary"
        disabled={!hasPlayableEpisode}
        disabledReason="再生可能なエピソードがありません"
        onClick={handlePlayClick}
      />
    </div>
  );
}
