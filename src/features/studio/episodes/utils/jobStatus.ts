import type { JobStatus } from '@/types/job';

/**
 * ジョブのステータスラベルを返す
 *
 * @param type - ジョブの種類
 * @param status - ジョブのステータス
 * @returns ステータスラベル
 *
 * @example
 * getJobStatusLabel('script', 'processing') // => '台本: 生成中...'
 * getJobStatusLabel('audio', 'completed') // => '音声: 生成完了'
 */
export function getJobStatusLabel(
  type: 'script' | 'audio',
  status: JobStatus,
): string {
  const prefix = type === 'script' ? '台本' : '音声';

  switch (status) {
    case 'pending':
      return `${prefix}: キュー待機中...`;
    case 'processing':
      return `${prefix}: 生成中...`;
    case 'canceling':
      return `${prefix}: キャンセル中...`;
    case 'completed':
      return `${prefix}: 生成完了`;
    case 'canceled':
      return `${prefix}: キャンセル済み`;
    case 'failed':
      return `${prefix}: 生成失敗`;
    default:
      return '';
  }
}

/**
 * ジョブの進捗を表示すべきかどうかを返す
 *
 * @param isGenerating - 生成中かどうか
 * @param status - ジョブのステータス
 * @returns 進捗を表示すべきなら true
 *
 * @example
 * shouldShowJobProgress(true, 'processing') // => true
 * shouldShowJobProgress(false, 'completed') // => true
 * shouldShowJobProgress(false, 'idle') // => false
 */
export function shouldShowJobProgress(
  isGenerating: boolean,
  status: JobStatus,
): boolean {
  return (
    isGenerating ||
    status === 'completed' ||
    status === 'canceled' ||
    status === 'failed'
  );
}
