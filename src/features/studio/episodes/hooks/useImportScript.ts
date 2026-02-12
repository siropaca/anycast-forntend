import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import { ApiError } from '@/libs/api/ApiError';
import {
  getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey,
  usePostChannelsChannelIdEpisodesEpisodeIdScriptImport,
} from '@/libs/api/generated/script/script';

interface ImportFileOptions {
  onSuccess?: () => void;
}

/**
 * 台本をテキストファイルからインポートする
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns ファイルインポート関数、ローディング状態、エラー
 */
export function useImportScript(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();

  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const importMutation = usePostChannelsChannelIdEpisodesEpisodeIdScriptImport({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey(
            channelId,
            episodeId,
          ),
        });
      },
    },
  });

  /**
   * ファイルを読み込んでインポートする
   *
   * @param file - インポートするファイル
   * @param options - オプション
   */
  async function importFile(
    file: File,
    options?: ImportFileOptions,
  ): Promise<void> {
    setIsImporting(true);
    setError(undefined);

    try {
      const text = await file.text();
      const response = await importMutation.mutateAsync({
        channelId,
        episodeId,
        data: { text },
      });

      if (response.status !== StatusCodes.OK) {
        setError(
          response.data.error?.message ?? '台本のインポートに失敗しました',
        );
        return;
      }

      options?.onSuccess?.();
    } catch (error) {
      setError(formatImportError(error));
    } finally {
      setIsImporting(false);
    }
  }

  /**
   * エラーをクリアする
   */
  function clearError() {
    setError(undefined);
  }

  return {
    isImporting,
    error,

    importFile,
    clearError,
  };
}

interface ScriptParseDetail {
  line: number;
  reason: string;
}

/**
 * スクリプトパースエラーの詳細かどうかを判定する
 *
 * @param detail - 判定する値
 * @returns ScriptParseDetail であれば true
 */
function isScriptParseDetail(detail: unknown): detail is ScriptParseDetail {
  return (
    typeof detail === 'object' &&
    detail !== null &&
    'line' in detail &&
    'reason' in detail &&
    typeof (detail as ScriptParseDetail).line === 'number' &&
    typeof (detail as ScriptParseDetail).reason === 'string'
  );
}

/**
 * インポートエラーからユーザー向けメッセージを生成する
 *
 * @param error - キャッチされたエラー
 * @returns 整形されたエラーメッセージ
 */
export function formatImportError(error: unknown): string {
  if (!(error instanceof ApiError)) {
    return '台本のインポートに失敗しました';
  }

  const { message, details } = error;

  if (!Array.isArray(details) || details.length === 0) {
    return message;
  }

  const detailLines = details
    .filter(isScriptParseDetail)
    .map((d) => `${d.line}行目: ${d.reason}`);

  if (detailLines.length === 0) {
    return message;
  }

  return `${message}\n${detailLines.join('\n')}`;
}
