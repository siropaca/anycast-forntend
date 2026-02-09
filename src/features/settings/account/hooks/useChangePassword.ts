import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { usePutAuthPassword } from '@/libs/api/generated/auth/auth';
import { useGetMe } from '@/libs/api/generated/me/me';

/**
 * パスワードの変更機能を提供する
 *
 * @returns パスワード設定状態、変更関数、ローディング状態、エラー
 */
export function useChangePassword() {
  const toast = useToast();
  const [error, setError] = useState<string>();

  const { data: meResponse } = useGetMe();
  const mutation = usePutAuthPassword();

  const hasPassword =
    meResponse?.status === StatusCodes.OK
      ? meResponse.data.data.hasPassword
      : true;

  /**
   * パスワードを変更する
   *
   * @param currentPassword - 現在のパスワード
   * @param newPassword - 新しいパスワード
   * @param onSuccess - 成功時コールバック
   */
  function changePassword(
    currentPassword: string,
    newPassword: string,
    onSuccess?: () => void,
  ) {
    setError(undefined);

    mutation.mutate(
      { data: { currentPassword, newPassword } },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.NO_CONTENT) {
            setError(response.data.error.message);
            return;
          }

          toast.success({ title: 'パスワードを変更しました' });
          onSuccess?.();
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error
              ? err.message
              : 'パスワードの変更に失敗しました';
          setError(message);
        },
      },
    );
  }

  return {
    hasPassword,
    isChanging: mutation.isPending,
    error,

    changePassword,
    clearError: () => setError(undefined),
  };
}
