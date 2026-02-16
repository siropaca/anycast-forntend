import {
  getJobStatusLabel,
  shouldShowJobProgress,
} from '@/features/studio/episodes/utils/jobStatus';
import type { JobStatus } from '@/types/job';

describe('getJobStatusLabel()', () => {
  const statuses: { status: JobStatus; expected: string }[] = [
    { status: 'pending', expected: 'キュー待機中...' },
    { status: 'processing', expected: '生成中...' },
    { status: 'canceling', expected: 'キャンセル中...' },
    { status: 'completed', expected: '生成が完了しました' },
    { status: 'canceled', expected: 'キャンセルされました' },
    { status: 'failed', expected: '生成に失敗しました' },
  ];

  it.each(statuses)('$status のとき正しいラベルを返す', ({
    status,
    expected,
  }) => {
    expect(getJobStatusLabel(status)).toBe(expected);
  });

  it('idle のとき空文字を返す', () => {
    expect(getJobStatusLabel('idle')).toBe('');
  });
});

describe('shouldShowJobProgress()', () => {
  it('生成中なら true を返す', () => {
    expect(shouldShowJobProgress(true, 'processing')).toBe(true);
  });

  it('completed なら true を返す', () => {
    expect(shouldShowJobProgress(false, 'completed')).toBe(true);
  });

  it('canceled なら true を返す', () => {
    expect(shouldShowJobProgress(false, 'canceled')).toBe(true);
  });

  it('failed なら true を返す', () => {
    expect(shouldShowJobProgress(false, 'failed')).toBe(true);
  });

  it('idle で生成中でなければ false を返す', () => {
    expect(shouldShowJobProgress(false, 'idle')).toBe(false);
  });

  it('pending で生成中でなければ false を返す', () => {
    expect(shouldShowJobProgress(false, 'pending')).toBe(false);
  });
});
