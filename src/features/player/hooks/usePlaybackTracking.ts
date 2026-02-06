import { useEffect, useRef } from 'react';

import { putEpisodesEpisodeIdPlayback } from '@/libs/api/generated/episodes/episodes';
import { usePlayerStore } from '@/stores/playerStore';

const INTERVAL_MS = 30_000;

/**
 * エピソード再生中の進捗をサーバーに記録するカスタムフック
 *
 * BottomPlayer のトップレベルで useAudioPlayer と並べて1回だけ呼び出す。
 * PlayerStore の状態変更を監視し、episode タイプのトラックのみを対象に
 * 再生開始・30秒ごと・一時停止・トラック変更時に API を呼ぶ。
 */
export function usePlaybackTracking() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevTrackIdRef = useRef<string | null>(null);
  const prevIsPlayingRef = useRef(false);

  useEffect(() => {
    /**
     * 再生進捗を API に送信する
     *
     * @param episodeId - エピソード ID
     * @param progressMs - 再生位置（ミリ秒）
     * @param completed - 再生完了フラグ
     */
    function sendProgress(
      episodeId: string,
      progressMs: number,
      completed: boolean,
    ) {
      putEpisodesEpisodeIdPlayback(episodeId, {
        progressMs: Math.round(progressMs),
        completed,
      }).catch((error: unknown) => {
        console.warn('[PlaybackTracking] Failed to send progress:', error);
      });
    }

    /** 30秒インターバルを開始する */
    function startInterval() {
      stopInterval();
      intervalRef.current = setInterval(() => {
        const { currentTrack, currentTimeMs } = usePlayerStore.getState();
        if (currentTrack?.type === 'episode') {
          sendProgress(currentTrack.id, currentTimeMs, false);
        }
      }, INTERVAL_MS);
    }

    /** 30秒インターバルを停止する */
    function stopInterval() {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    const unsubscribe = usePlayerStore.subscribe((state, prevState) => {
      const currentTrack = state.currentTrack;
      const prevTrack = prevState.currentTrack;
      const trackChanged = currentTrack?.id !== prevTrack?.id;

      // トラック変更時: 前のエピソードの最終進捗を送信
      if (trackChanged && prevTrack?.type === 'episode') {
        const completed =
          prevState.durationMs - prevState.currentTimeMs < 1000;
        sendProgress(prevTrack.id, prevState.currentTimeMs, completed);
        stopInterval();
      }

      // 現在のトラックが episode でない場合は何もしない
      if (currentTrack?.type !== 'episode') {
        if (trackChanged) {
          stopInterval();
          prevTrackIdRef.current = currentTrack?.id ?? null;
          prevIsPlayingRef.current = state.isPlaying;
        }
        return;
      }

      // 再生開始（トラック変更 or 一時停止→再開）
      if (
        state.isPlaying &&
        (!prevState.isPlaying || trackChanged)
      ) {
        sendProgress(currentTrack.id, state.currentTimeMs, false);
        startInterval();
      }

      // 一時停止
      if (!state.isPlaying && prevState.isPlaying && !trackChanged) {
        stopInterval();
        sendProgress(currentTrack.id, state.currentTimeMs, false);
      }

      prevTrackIdRef.current = currentTrack?.id ?? null;
      prevIsPlayingRef.current = state.isPlaying;
    });

    return () => {
      unsubscribe();
      stopInterval();
    };
  }, []);
}
