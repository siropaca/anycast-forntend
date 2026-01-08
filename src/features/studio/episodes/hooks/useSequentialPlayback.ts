import { useCallback, useEffect, useState } from 'react';
import type { ResponseScriptLineResponse } from '@/libs/api/generated/schemas';

/**
 * 台本行の連続再生を制御する
 *
 * @param scriptLines - 台本行の配列
 * @returns 連続再生の状態と制御関数
 */
export function useSequentialPlayback(
  scriptLines: ResponseScriptLineResponse[],
) {
  /** 連続再生が有効かどうか */
  const [isSequentialEnabled, setIsSequentialEnabled] = useState(true);

  /** 現在再生中の行 ID（再生中でなければ undefined） */
  const [currentPlayingId, setCurrentPlayingId] = useState<string | undefined>(
    undefined,
  );

  // scriptLines が更新されたとき、currentPlayingId が存在しなくなったら停止
  useEffect(() => {
    if (currentPlayingId === undefined) return;

    const exists = scriptLines.some((line) => line.id === currentPlayingId);
    if (!exists) {
      setCurrentPlayingId(undefined);
    }
  }, [scriptLines, currentPlayingId]);

  /** 連続再生の有効/無効を切り替える */
  const toggleSequential = useCallback(() => {
    setIsSequentialEnabled((prev) => !prev);
  }, []);

  /** 指定した行から再生を開始する */
  const startPlayback = useCallback(
    (lineId: string) => {
      if (!isSequentialEnabled) return;
      setCurrentPlayingId(lineId);
    },
    [isSequentialEnabled],
  );

  /** 再生を停止する */
  const stopPlayback = useCallback(() => {
    setCurrentPlayingId(undefined);
  }, []);

  /** 現在の行の再生が終了したときに呼ぶ（次の行へ進む） */
  const handleEnded = useCallback(
    (lineId: string) => {
      if (!isSequentialEnabled) return;

      const currentIndex = scriptLines.findIndex((line) => line.id === lineId);
      if (currentIndex === -1) {
        setCurrentPlayingId(undefined);
        return;
      }

      // 次の audio がある行を探す
      let nextPlayableIndex = -1;
      for (let i = currentIndex + 1; i < scriptLines.length; i++) {
        if (scriptLines[i].audio !== undefined) {
          nextPlayableIndex = i;
          break;
        }
      }

      if (nextPlayableIndex !== -1) {
        setCurrentPlayingId(scriptLines[nextPlayableIndex].id);
      } else {
        setCurrentPlayingId(undefined);
      }
    },
    [isSequentialEnabled, scriptLines],
  );

  /** 指定した行が再生中かどうか */
  const isPlaying = useCallback(
    (lineId: string) => {
      return currentPlayingId === lineId;
    },
    [currentPlayingId],
  );

  return {
    isSequentialEnabled,
    currentPlayingId,

    toggleSequential,
    startPlayback,
    stopPlayback,
    handleEnded,
    isPlaying,
  };
}
