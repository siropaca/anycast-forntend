import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import { useDeleteMe } from '@/libs/api/generated/me/me';

/**
 * アカウント削除機能を提供する
 *
 * @returns 削除関数、ローディング状態、エラー
 */
export function useDeleteAccount() {
  const [error, setError] = useState<string>();
  const mutation = useDeleteMe();

  /**
   * アカウントを削除する
   *
   * @param onSuccess - 成功時コールバック
   */
  function deleteAccount(onSuccess?: () => void) {
    setError(undefined);

    mutation.mutate(undefined, {
      onSuccess: (response) => {
        if (response.status !== StatusCodes.NO_CONTENT) {
          setError(response.data.error.message);
          return;
        }

        onSuccess?.();
      },
      onError: (err: unknown) => {
        const message =
          err instanceof Error ? err.message : 'アカウントの削除に失敗しました';
        setError(message);
      },
    });
  }

  return {
    isDeleting: mutation.isPending,
    error,

    deleteAccount,
    clearError: () => setError(undefined),
  };
}
