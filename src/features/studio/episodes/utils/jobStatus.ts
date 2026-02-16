import type { JobStatus } from '@/types/job';

/**
 * ジョブのステータスラベルを返す
 *
 * @param status - ジョブのステータス
 * @returns ステータスラベル
 *
 * @example
 * getJobStatusLabel('processing') // => '生成中...'
 * getJobStatusLabel('completed') // => '生成が完了しました'
 */
export function getJobStatusLabel(status: JobStatus): string {
  switch (status) {
    case 'pending':
      return 'キュー待機中...';
    case 'processing':
      return '生成中...';
    case 'canceling':
      return 'キャンセル中...';
    case 'completed':
      return '生成が完了しました';
    case 'canceled':
      return 'キャンセルされました';
    case 'failed':
      return '生成に失敗しました';
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
