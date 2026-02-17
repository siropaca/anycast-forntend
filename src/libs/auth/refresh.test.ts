import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { _resetForTesting, deduplicatedRefresh } from '@/libs/auth/refresh';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

/**
 * リフレッシュ成功レスポンスを生成する
 *
 * @param accessToken - 新しいアクセストークン
 * @param refreshToken - 新しいリフレッシュトークン
 * @returns Response モック
 */
function createSuccessResponse(
  accessToken: string,
  refreshToken: string,
): Partial<Response> {
  return {
    ok: true,
    status: 200,
    json: vi.fn().mockResolvedValue({
      data: { accessToken, refreshToken },
    }),
  };
}

/**
 * リフレッシュ失敗レスポンスを生成する
 *
 * @param status - HTTP ステータスコード
 * @returns Response モック
 */
function createErrorResponse(status: number): Partial<Response> {
  return {
    ok: false,
    status,
  };
}

describe('deduplicatedRefresh', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    _resetForTesting();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('リフレッシュトークンで新しいトークンペアを取得する', async () => {
    mockFetch.mockResolvedValue(
      createSuccessResponse('new-access', 'new-refresh'),
    );

    const result = await deduplicatedRefresh('old-refresh');

    expect(result).toEqual({
      accessToken: 'new-access',
      refreshToken: 'new-refresh',
    });
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/auth/refresh'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: 'old-refresh' }),
      }),
    );
  });

  it('リフレッシュ失敗時にエラーをスローする', async () => {
    mockFetch.mockResolvedValue(createErrorResponse(401));

    await expect(deduplicatedRefresh('invalid-refresh')).rejects.toThrow(
      'Refresh failed: 401',
    );
  });

  it('並行呼び出し時に fetch を 1 回だけ実行する', async () => {
    mockFetch.mockResolvedValue(
      createSuccessResponse('new-access', 'new-refresh'),
    );

    const [result1, result2, result3] = await Promise.all([
      deduplicatedRefresh('token'),
      deduplicatedRefresh('token'),
      deduplicatedRefresh('token'),
    ]);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result1).toEqual(result2);
    expect(result2).toEqual(result3);
  });

  it('異なるリフレッシュトークンでは新しいリクエストを発行する', async () => {
    mockFetch
      .mockResolvedValueOnce(createSuccessResponse('access-1', 'refresh-1'))
      .mockResolvedValueOnce(createSuccessResponse('access-2', 'refresh-2'));

    const result1 = await deduplicatedRefresh('token-1');
    const result2 = await deduplicatedRefresh('token-2');

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(result1.accessToken).toBe('access-1');
    expect(result2.accessToken).toBe('access-2');
  });

  it('リフレッシュ失敗後も次の呼び出しで再試行する', async () => {
    mockFetch
      .mockResolvedValueOnce(createErrorResponse(500))
      .mockResolvedValueOnce(createSuccessResponse('access', 'refresh'));

    await expect(deduplicatedRefresh('token')).rejects.toThrow();

    const result = await deduplicatedRefresh('token');
    expect(result.accessToken).toBe('access');
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('同じトークンでの再呼び出しはキャッシュ結果を返す（トークンローテーション対策）', async () => {
    mockFetch.mockResolvedValue(
      createSuccessResponse('new-access', 'new-refresh'),
    );

    const result1 = await deduplicatedRefresh('old-token');
    const result2 = await deduplicatedRefresh('old-token');

    // 2回目の呼び出しはキャッシュから返されるため、fetch は 1 回のみ
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result1).toEqual(result2);
  });

  it('キャッシュの有効期限が切れた場合は新しいリクエストを発行する', async () => {
    mockFetch
      .mockResolvedValueOnce(createSuccessResponse('access-1', 'refresh-1'))
      .mockResolvedValueOnce(createSuccessResponse('access-2', 'refresh-2'));

    await deduplicatedRefresh('token');

    // 60秒以上経過させる
    vi.advanceTimersByTime(61_000);

    const result = await deduplicatedRefresh('token');
    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(result.accessToken).toBe('access-2');
  });
});
