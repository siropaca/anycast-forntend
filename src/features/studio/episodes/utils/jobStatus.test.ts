import {
  getJobStatusLabel,
  shouldShowJobProgress,
} from '@/features/studio/episodes/utils/jobStatus';
import type { JobStatus } from '@/types/job';

describe('getJobStatusLabel()', () => {
  const statuses: { status: JobStatus; script: string; audio: string }[] = [
    {
      status: 'pending',
      script: '台本: キュー待機中...',
      audio: '音声: キュー待機中...',
    },
    {
      status: 'processing',
      script: '台本: 生成中...',
      audio: '音声: 生成中...',
    },
    {
      status: 'canceling',
      script: '台本: キャンセル中...',
      audio: '音声: キャンセル中...',
    },
    {
      status: 'completed',
      script: '台本: 生成完了',
      audio: '音声: 生成完了',
    },
    {
      status: 'canceled',
      script: '台本: キャンセル済み',
      audio: '音声: キャンセル済み',
    },
    {
      status: 'failed',
      script: '台本: 生成失敗',
      audio: '音声: 生成失敗',
    },
  ];

  it.each(statuses)('$status のとき正しいラベルを返す', ({
    status,
    script,
    audio,
  }) => {
    expect(getJobStatusLabel('script', status)).toBe(script);
    expect(getJobStatusLabel('audio', status)).toBe(audio);
  });

  it('idle のとき空文字を返す', () => {
    expect(getJobStatusLabel('script', 'idle')).toBe('');
    expect(getJobStatusLabel('audio', 'idle')).toBe('');
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
