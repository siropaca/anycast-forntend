'use client';

import { PauseIcon, PlayIcon } from '@phosphor-icons/react';
import { useVoicePlayer } from '@/features/studio/voices/hooks/useVoicePlayer';
import type { ResponseVoiceResponse } from '@/libs/api/generated/schemas';

interface Props {
  voice: ResponseVoiceResponse;
}

export function VoiceSampleButton({ voice }: Props) {
  const { isVoicePlaying, playVoice, pauseVoice } = useVoicePlayer();
  const playing = isVoicePlaying(voice);

  function handleClick() {
    if (playing) {
      pauseVoice();
    } else {
      playVoice(voice, [voice]);
    }
  }

  return (
    <button
      type="button"
      aria-label={playing ? '一時停止' : 'サンプル再生'}
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
