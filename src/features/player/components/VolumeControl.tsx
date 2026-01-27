'use client';

import {
  SpeakerHighIcon,
  SpeakerLowIcon,
  SpeakerNoneIcon,
  SpeakerSlashIcon,
} from '@phosphor-icons/react';
import type { ReactNode } from 'react';

interface Props {
  volume: number;
  isMuted: boolean;

  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
}

export function VolumeControl({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
}: Props) {
  const displayVolume = isMuted ? 0 : volume;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onVolumeChange(Number(e.target.value) / 100);
  }

  function getVolumeIcon(): ReactNode {
    if (isMuted) return <SpeakerSlashIcon size={20} />;
    if (volume === 0) return <SpeakerNoneIcon size={20} />;
    if (volume <= 0.5) return <SpeakerLowIcon size={20} />;
    return <SpeakerHighIcon size={20} />;
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label={isMuted ? 'ミュート解除' : 'ミュート'}
        onClick={onToggleMute}
        className="text-text-subtle hover:text-text-main transition-colors"
      >
        {getVolumeIcon()}
      </button>

      <input
        type="range"
        className="player-slider w-[100px]"
        min={0}
        max={100}
        value={Math.round(displayVolume * 100)}
        aria-label="音量"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(displayVolume * 100)}
        onChange={handleChange}
        style={{
          background: `linear-gradient(to right, var(--color-primary) ${displayVolume * 100}%, var(--color-bg-elevated) ${displayVolume * 100}%)`,
        }}
      />
    </div>
  );
}
