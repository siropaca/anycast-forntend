import { toTrackFromBgm } from '@/features/player/utils/trackConverter';
import type { ResponseBgmWithEpisodesResponse } from '@/libs/api/generated/schemas';
import { usePlayerStore } from '@/stores/playerStore';

/**
 * BGM の再生を制御するフック
 *
 * @returns BGM 再生の状態と操作関数
 */
export function useBgmPlayer() {
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const play = usePlayerStore((s) => s.play);
  const pause = usePlayerStore((s) => s.pause);

  /**
   * 指定した BGM が再生中かどうかを判定する
   */
  function isBgmPlaying(bgm: ResponseBgmWithEpisodesResponse): boolean {
    return (
      currentTrack?.id === bgm.id && currentTrack?.type === 'bgm' && isPlaying
    );
  }

  /**
   * BGM を再生する（キュー付き）
   */
  function playBgm(
    bgm: ResponseBgmWithEpisodesResponse,
    bgms: ResponseBgmWithEpisodesResponse[],
  ) {
    const queue = bgms.map(toTrackFromBgm);
    play(toTrackFromBgm(bgm), queue);
  }

  /**
   * 再生中の BGM を一時停止する
   */
  function pauseBgm() {
    pause();
  }

  return {
    isBgmPlaying,
    playBgm,
    pauseBgm,
  };
}
