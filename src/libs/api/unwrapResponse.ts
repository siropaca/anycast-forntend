import { StatusCodes } from 'http-status-codes';

/**
 * orval が生成したレスポンスからデータを取り出す
 *
 * defaultValue を省略した場合、データが存在しなければ例外を throw する。
 * Suspense フックなど、成功が保証されている場合に使用する。
 *
 * @param response - orval が生成したレスポンス
 * @param defaultValue - エラー時のデフォルト値（省略可）
 * @returns 成功時はレスポンスデータ、エラー時はデフォルト値または例外
 *
 * @example
 * // デフォルト値あり
 * const channels = unwrapResponse<Response[]>(data, []);
 *
 * // デフォルト値なし（Suspense フック向け）
 * const episode = unwrapResponse<Episode>(data);
 */
export function unwrapResponse<T>(
  response: { status: number; data: unknown } | undefined,
): T;
export function unwrapResponse<T>(
  response: { status: number; data: unknown } | undefined,
  defaultValue: T,
): T;
export function unwrapResponse<T>(
  response: { status: number; data: unknown } | undefined,
  defaultValue?: T,
): T {
  if (
    response?.status === StatusCodes.OK ||
    response?.status === StatusCodes.CREATED
  ) {
    const data = response.data as { data?: T } | undefined;
    const result = data?.data;

    if (result !== undefined) {
      return result;
    }
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new Error('Failed to unwrap response: data not found');
}

/**
 * orval が生成したページネーション付きレスポンスからデータを取り出す
 *
 * defaultValue を省略した場合、データが存在しなければ例外を throw する。
 * Suspense フックなど、成功が保証されている場合に使用する。
 *
 * @param response - orval が生成したレスポンス
 * @param defaultValue - エラー時のデフォルト値（省略可）
 * @returns 成功時はレスポンスデータ（data と pagination を含む）、エラー時はデフォルト値または例外
 *
 * @example
 * // デフォルト値あり
 * const response = unwrapPaginatedResponse<ChannelListWithPagination>(data, { data: [], pagination: defaultPagination });
 *
 * // デフォルト値なし（Suspense フック向け）
 * const response = unwrapPaginatedResponse<ChannelListWithPagination>(data);
 */
export function unwrapPaginatedResponse<T>(
  response: { status: number; data: unknown } | undefined,
): T;
export function unwrapPaginatedResponse<T>(
  response: { status: number; data: unknown } | undefined,
  defaultValue: T,
): T;
export function unwrapPaginatedResponse<T>(
  response: { status: number; data: unknown } | undefined,
  defaultValue?: T,
): T {
  if (
    response?.status === StatusCodes.OK ||
    response?.status === StatusCodes.CREATED
  ) {
    const result = response.data as T | undefined;

    if (result !== undefined) {
      return result;
    }
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new Error('Failed to unwrap paginated response: data not found');
}
