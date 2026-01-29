'use client';

import {
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from '@phosphor-icons/react';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { ProgressBar } from '@/features/player/components/ProgressBar';
import { cn } from '@/utils/cn';

interface Props {
  isPlaying: boolean;
  currentTimeMs: number;
  durationMs: number;
  hasPrevious?: boolean;
  hasNext?: boolean;

  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (timeMs: number) => void;
}

export function PlaybackControls({
  isPlaying,
  currentTimeMs,
  durationMs,
  hasPrevious = true,
  hasNext = true,
  onPlayPause,
  onPrevious,
  onNext,
  onSeek,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-[600px]">
      <div className="flex items-center gap-6">
        <button
          type="button"
          aria-label="前のトラック"
          disabled={!hasPrevious}
          onClick={onPrevious}
          className={cn(
            'text-text-subtle transition-colors',
            hasPrevious && 'hover:text-text-main cursor-pointer',
            !hasPrevious && 'opacity-50 cursor-default',
          )}
        >
          <SkipBackIcon size={20} weight="fill" />
        </button>

        <IconButton
          icon={
            isPlaying ? (
              <PauseIcon size={18} weight="fill" />
            ) : (
              <PlayIcon size={18} weight="fill" />
            )
          }
          aria-label={isPlaying ? '一時停止' : '再生'}
          size="sm"
          color="secondary"
          variant="solid"
          className="transition-transform hover:scale-105"
          onClick={onPlayPause}
        />

        <button
          type="button"
          aria-label="次のトラック"
          disabled={!hasNext}
          className={cn(
            'text-text-subtle transition-colors',
            hasNext && 'hover:text-text-main cursor-pointer',
            !hasNext && 'opacity-50 cursor-default',
          )}
          onClick={onNext}
        >
          <SkipForwardIcon size={20} weight="fill" />
        </button>
      </div>

      <ProgressBar
        currentTimeMs={currentTimeMs}
        durationMs={durationMs}
        onSeek={onSeek}
      />
    </div>
  );
}
