'use client';

import { PauseIcon, PlayIcon } from '@phosphor-icons/react';
import { toTrackFromDefaultBgm } from '@/features/player/utils/trackConverter';
import type { ResponseChannelDefaultBgmResponse } from '@/libs/api/generated/schemas';
import { usePlayerStore } from '@/stores/playerStore';

interface Props {
  bgm: ResponseChannelDefaultBgmResponse;
}

export function BgmPlayButton({ bgm }: Props) {
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const play = usePlayerStore((s) => s.play);
  const pause = usePlayerStore((s) => s.pause);

  const playing =
    currentTrack?.id === bgm.id && currentTrack?.type === 'bgm' && isPlaying;

  function handleClick() {
    if (playing) {
      pause();
    } else {
      play(toTrackFromDefaultBgm(bgm));
    }
  }

  return (
    <button
      type="button"
      aria-label={playing ? '一時停止' : '再生'}
      className="flex size-5 shrink-0 items-center justify-center rounded-full bg-bg-hover text-text-subtle transition-colors hover:bg-bg-hover-strong hover:text-text cursor-pointer"
      onClick={handleClick}
    >
      {playing ? (
        <PauseIcon size={10} weight="fill" />
      ) : (
        <PlayIcon size={10} weight="fill" />
      )}
    </button>
  );
}
