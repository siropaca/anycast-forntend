import { toTrackFromVoice } from '@/features/player/utils/trackConverter';
import type { ResponseVoiceResponse } from '@/libs/api/generated/schemas';
import { usePlayerStore } from '@/stores/playerStore';

/**
 * ボイスサンプルの再生を制御するフック
 *
 * @returns ボイス再生の状態と操作関数
 */
export function useVoicePlayer() {
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const play = usePlayerStore((s) => s.play);
  const pause = usePlayerStore((s) => s.pause);

  /**
   * 指定したボイスが再生中かどうかを判定する
   */
  function isVoicePlaying(voice: ResponseVoiceResponse): boolean {
    return (
      currentTrack?.id === voice.id &&
      currentTrack?.type === 'voiceSample' &&
      isPlaying
    );
  }

  /**
   * ボイスを再生する（キュー付き）
   */
  function playVoice(
    voice: ResponseVoiceResponse,
    voices: ResponseVoiceResponse[],
  ) {
    const queue = voices.map(toTrackFromVoice);
    play(toTrackFromVoice(voice), queue);
  }

  /**
   * 再生中のボイスを一時停止する
   */
  function pauseVoice() {
    pause();
  }

  return {
    isVoicePlaying,
    playVoice,
    pauseVoice,
  };
}
