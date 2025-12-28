const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8081';

/**
 * orval 用のカスタムフェッチャー
 *
 * @param url - API エンドポイント（ベースパスからの相対パス）
 * @param options - fetch オプション
 * @returns レスポンスデータ
 * @throws HTTP エラー時にエラーをスロー
 */
export async function customFetcher<TResponse>(
  url: string,
  options?: RequestInit,
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1${url}`, {
    ...options,
    headers: {
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error?.message || `HTTP error ${response.status}`);
  }

  const data = await response.json();

  return {
    data,
    status: response.status,
    headers: response.headers,
  } as TResponse;
}

export default customFetcher;
