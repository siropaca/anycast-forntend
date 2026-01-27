import { useState } from 'react';

const MOCK_TRACK = {
  title: 'エピソードタイトル',
  channelName: 'チャンネル名',
  artworkUrl: undefined,
  currentTimeMs: 83000, // 1:23
  durationMs: 296000, // 4:56
};

export function useMockPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTimeMs, setCurrentTimeMs] = useState(MOCK_TRACK.currentTimeMs);

  function handlePlayPause() {
    setIsPlaying((prev) => !prev);
  }

  function handlePrevious() {
    setCurrentTimeMs(0);
  }

  function handleNext() {
    // 固定データのため操作なし
  }

  function handleSeek(timeMs: number) {
    setCurrentTimeMs(timeMs);
  }

  function handleVolumeChange(v: number) {
    setVolume(v);
    if (isMuted && v > 0) {
      setIsMuted(false);
    }
  }

  function handleToggleMute() {
    setIsMuted((prev) => !prev);
  }

  return {
    track: MOCK_TRACK,
    isPlaying,
    volume,
    isMuted,
    currentTimeMs,
    hasPrevious: false,
    hasNext: false,
    onPlayPause: handlePlayPause,
    onPrevious: handlePrevious,
    onNext: handleNext,
    onSeek: handleSeek,
    onVolumeChange: handleVolumeChange,
    onToggleMute: handleToggleMute,
  };
}
