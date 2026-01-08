import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import type { BulkGenerateStatus } from '@/features/studio/episodes/components/ScriptLineItem';
import type { ResponseScriptLineResponse } from '@/libs/api/generated/schemas';
import {
  getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey,
  usePostChannelsChannelIdEpisodesEpisodeIdScriptLinesLineIdAudioGenerate,
} from '@/libs/api/generated/script/script';

/** 同時に実行する最大リクエスト数 */
const MAX_CONCURRENT_REQUESTS = 10;

/**
 * 音声未生成の行を一括で生成する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @param scriptLines - 台本行の配列
 * @returns 一括生成の状態と実行関数
 */
export function useBulkGenerateAudio(
  channelId: string,
  episodeId: string,
  scriptLines: ResponseScriptLineResponse[],
) {
  const queryClient = useQueryClient();

  /** 生成中かどうか */
  const [isGenerating, setIsGenerating] = useState(false);
  /** 生成対象の総数 */
  const [totalCount, setTotalCount] = useState(0);
  /** 完了した件数 */
  const [completedCount, setCompletedCount] = useState(0);
  /** 現在生成中の行 ID のセット */
  const [generatingIds, setGeneratingIds] = useState<Set<string>>(new Set());
  /** 保留中の行 ID のセット（件数制限で待機中） */
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
  /** エラーメッセージ */
  const [error, setError] = useState<string | undefined>(undefined);

  /** 音声未生成の行数 */
  const ungeneratedCount = scriptLines.filter(
    (line) => line.audio === undefined,
  ).length;

  const mutation =
    usePostChannelsChannelIdEpisodesEpisodeIdScriptLinesLineIdAudioGenerate({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey:
              getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey(
                channelId,
                episodeId,
              ),
          });
        },
      },
    });

  /** 一括生成を実行する */
  const generateAll = useCallback(async () => {
    // 音声未生成の行をフィルタ
    const targetLines = scriptLines.filter((line) => line.audio === undefined);

    if (targetLines.length === 0) return;

    setIsGenerating(true);
    setTotalCount(targetLines.length);
    setCompletedCount(0);
    setError(undefined);

    const allIds = targetLines.map((line) => line.id);

    // 最初の10件を生成中、残りを保留中に設定
    const initialGeneratingIds = new Set(
      allIds.slice(0, MAX_CONCURRENT_REQUESTS),
    );
    const initialPendingIds = new Set(allIds.slice(MAX_CONCURRENT_REQUESTS));

    setGeneratingIds(initialGeneratingIds);
    setPendingIds(initialPendingIds);

    let completed = 0;

    /** 1行の音声を生成する */
    async function generateOne(lineId: string): Promise<void> {
      try {
        await mutation.mutateAsync({
          channelId,
          episodeId,
          lineId,
        });
      } catch {
        // エラーは無視して継続（他の行の生成は止めない）
      } finally {
        completed++;
        setCompletedCount(completed);

        // 生成中から削除
        setGeneratingIds((prev) => {
          const next = new Set(prev);
          next.delete(lineId);
          return next;
        });
      }
    }

    // 同時実行数を制限しながら並列処理
    const queue = [...allIds];
    const executing: Promise<void>[] = [];

    while (queue.length > 0 || executing.length > 0) {
      // 実行中が上限未満かつキューに残りがあれば、新しいタスクを開始
      while (executing.length < MAX_CONCURRENT_REQUESTS && queue.length > 0) {
        const lineId = queue.shift()!;

        // 保留中から生成中へ移動
        setPendingIds((prev) => {
          const next = new Set(prev);
          next.delete(lineId);
          return next;
        });
        setGeneratingIds((prev) => {
          const next = new Set(prev);
          next.add(lineId);
          return next;
        });

        const promise = generateOne(lineId).then(() => {
          // 完了したら executing から削除
          const index = executing.indexOf(promise);
          if (index > -1) {
            executing.splice(index, 1);
          }
        });

        executing.push(promise);
      }

      // 少なくとも1つ完了するまで待機
      if (executing.length > 0) {
        await Promise.race(executing);
      }
    }

    setIsGenerating(false);
    setGeneratingIds(new Set());
    setPendingIds(new Set());
  }, [channelId, episodeId, scriptLines, mutation]);

  /** 行の一括生成ステータスを取得する */
  function getStatus(lineId: string): BulkGenerateStatus {
    if (generatingIds.has(lineId)) return 'generating';
    if (pendingIds.has(lineId)) return 'pending';
    return 'idle';
  }

  return {
    isGenerating,
    totalCount,
    completedCount,
    error,
    ungeneratedCount,

    generateAll,
    getStatus,
  };
}
