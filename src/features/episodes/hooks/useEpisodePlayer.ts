'use client';

import { toTrackFromEpisode } from '@/features/player/utils/trackConverter';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas/responseEpisodeResponse';
import { usePlayerStore } from '@/stores/playerStore';

/**
 * エピソードの再生を制御するフック
 *
 * @param channelName - チャンネル名（サブタイトル表示用）
 * @returns エピソード再生の状態と操作関数
 */
export function useEpisodePlayer(channelName: string) {
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const play = usePlayerStore((s) => s.play);
  const pause = usePlayerStore((s) => s.pause);
  const resume = usePlayerStore((s) => s.resume);
  const seek = usePlayerStore((s) => s.seek);

  /**
   * 指定したエピソードが再生中かどうかを判定する
   *
   * @param episode - エピソード
   * @returns 再生中なら true
   */
  function isEpisodePlaying(episode: ResponseEpisodeResponse): boolean {
    return (
      currentTrack?.id === episode.id &&
      currentTrack?.type === 'episode' &&
      isPlaying
    );
  }

  /**
   * エピソードを再生する
   *
   * 未完了の再生履歴がある場合は保存された位置から再開する。
   *
   * @param episode - 再生するエピソード
   */
  function playEpisode(episode: ResponseEpisodeResponse) {
    if (currentTrack?.id === episode.id && currentTrack?.type === 'episode') {
      resume();
    } else {
      play(toTrackFromEpisode(episode, channelName));

      const savedProgress = episode.playback;
      if (savedProgress && !savedProgress.completed && savedProgress.progressMs > 0) {
        seek(savedProgress.progressMs);
      }
    }
  }

  /**
   * 再生中のエピソードを一時停止する
   */
  function pauseEpisode() {
    pause();
  }

  return {
    isEpisodePlaying,
    playEpisode,
    pauseEpisode,
  };
}
