interface RefreshResult {
  accessToken: string;
  refreshToken: string;
}

/**
 * リフレッシュトークンを使って新しいトークンペアを取得する
 *
 * @param refreshToken - 現在のリフレッシュトークン
 * @returns 新しいアクセストークンとリフレッシュトークン
 * @throws リフレッシュに失敗した場合
 */
async function refreshAccessToken(
  refreshToken: string,
): Promise<RefreshResult> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/refresh`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    },
  );

  if (!response.ok) {
    throw new Error(`Refresh failed: ${response.status}`);
  }

  const json = (await response.json()) as {
    data: { accessToken: string; refreshToken: string };
  };

  return {
    accessToken: json.data.accessToken,
    refreshToken: json.data.refreshToken,
  };
}

/** 並行リクエストによる重複リフレッシュを防止する進行中の Promise */
let pendingRefresh: Promise<RefreshResult> | null = null;

/**
 * 同じリフレッシュトークンによる再リフレッシュを防ぐ結果キャッシュ。
 * バックエンドがトークンローテーション（旧トークン無効化）を行う場合、
 * 成功後に同じトークンで再リフレッシュすると失敗するため、結果をキャッシュする。
 */
let lastRefreshEntry: {
  usedToken: string;
  result: RefreshResult;
  timestamp: number;
} | null = null;

/** 結果キャッシュの有効期間（ミリ秒） */
const REFRESH_CACHE_TTL_MS = 60_000;

/**
 * Promise ベースの重複排除 + 結果キャッシュ付きリフレッシュ
 *
 * - 同時並行のリフレッシュは Promise を共有して重複 API 呼び出しを防止
 * - 完了後も同じリフレッシュトークンでの再呼び出しにはキャッシュ結果を返す
 *
 * @param refreshToken - 現在のリフレッシュトークン
 * @returns 新しいトークンペア
 */
export async function deduplicatedRefresh(
  refreshToken: string,
): Promise<RefreshResult> {
  // 同じリフレッシュトークンで既に成功している場合はキャッシュを返す
  if (
    lastRefreshEntry &&
    lastRefreshEntry.usedToken === refreshToken &&
    Date.now() - lastRefreshEntry.timestamp < REFRESH_CACHE_TTL_MS
  ) {
    return lastRefreshEntry.result;
  }

  // リフレッシュが進行中の場合は同じ Promise を返す
  if (pendingRefresh) return pendingRefresh;

  pendingRefresh = refreshAccessToken(refreshToken)
    .then((result) => {
      lastRefreshEntry = {
        usedToken: refreshToken,
        result,
        timestamp: Date.now(),
      };
      return result;
    })
    .finally(() => {
      pendingRefresh = null;
    });

  return pendingRefresh;
}

/**
 * モジュール状態をリセットする（テスト用）
 */
export function _resetForTesting(): void {
  pendingRefresh = null;
  lastRefreshEntry = null;
}
