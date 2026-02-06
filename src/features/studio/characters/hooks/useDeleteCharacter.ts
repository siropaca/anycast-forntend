import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import { useToast } from '@/hooks/useToast';
import {
  getGetMeCharactersQueryKey,
  useDeleteMeCharactersCharacterId,
} from '@/libs/api/generated/me/me';

/**
 * キャラクター削除ミューテーションを提供する
 *
 * @returns 削除関数、削除中フラグ、エラー
 */
export function useDeleteCharacter() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const mutation = useDeleteMeCharactersCharacterId();

  const [error, setError] = useState<string>();

  /**
   * キャラクターを削除する
   *
   * @param characterId - 削除するキャラクターのID
   * @returns 削除が成功したかどうか
   */
  async function deleteCharacter(characterId: string): Promise<boolean> {
    setError(undefined);

    try {
      const response = await mutation.mutateAsync({ characterId });

      if (response.status !== StatusCodes.NO_CONTENT) {
        setError(response.data.error.message);
        return false;
      }

      queryClient.invalidateQueries({
        queryKey: getGetMeCharactersQueryKey(),
      });
      toast.success({ title: 'キャラクターを削除しました' });
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'キャラクターの削除に失敗しました';
      setError(message);
      toast.error({ title: message });
      return false;
    }
  }

  /**
   * エラー状態をクリアする
   */
  function clearError() {
    setError(undefined);
  }

  return {
    isDeleting: mutation.isPending,
    error,

    deleteCharacter,
    clearError,
  };
}
