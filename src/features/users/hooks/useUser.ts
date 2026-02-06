'use client';

import type { ResponsePublicUserResponse } from '@/libs/api/generated/schemas';
import { useGetUsersUsernameSuspense } from '@/libs/api/generated/users/users';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * ユーザーの公開プロフィールを取得する
 *
 * @param username - ユーザー名
 * @returns ユーザー情報（チャンネル一覧を含む）
 */
export function useUser(username: string) {
  const { data } = useGetUsersUsernameSuspense(username);

  const user = unwrapResponse<ResponsePublicUserResponse>(data);

  return {
    user,
  };
}
