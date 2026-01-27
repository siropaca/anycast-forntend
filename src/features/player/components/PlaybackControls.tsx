'use client';

import {
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from '@phosphor-icons/react';
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
            hasPrevious && 'hover:text-text-main',
            !hasPrevious && 'opacity-50 cursor-default',
          )}
        >
          <SkipBackIcon size={20} weight="fill" />
        </button>

        <button
          type="button"
          aria-label={isPlaying ? '一時停止' : '再生'}
          onClick={onPlayPause}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-bg-main transition-transform hover:scale-105"
        >
          {isPlaying ? (
            <PauseIcon size={18} weight="fill" />
          ) : (
            <PlayIcon size={18} weight="fill" />
          )}
        </button>

        <button
          type="button"
          aria-label="次のトラック"
          disabled={!hasNext}
          onClick={onNext}
          className={cn(
            'text-text-subtle transition-colors',
            hasNext && 'hover:text-text-main',
            !hasNext && 'opacity-50 cursor-default',
          )}
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
