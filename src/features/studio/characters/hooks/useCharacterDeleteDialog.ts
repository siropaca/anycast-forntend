import { useState } from 'react';
import { useDeleteCharacter } from '@/features/studio/characters/hooks/useDeleteCharacter';
import type { ResponseCharacterWithChannelsResponse } from '@/libs/api/generated/schemas';

/**
 * キャラクター削除ダイアログの状態を管理するフック
 *
 * @returns ダイアログの状態と操作関数
 */
export function useCharacterDeleteDialog() {
  const [deleteTarget, setDeleteTarget] =
    useState<ResponseCharacterWithChannelsResponse | null>(null);
  const { deleteCharacter, isDeleting, error, clearError } =
    useDeleteCharacter();

  const isOpen = deleteTarget !== null;

  function open(character: ResponseCharacterWithChannelsResponse) {
    clearError();
    setDeleteTarget(character);
  }

  function close() {
    setDeleteTarget(null);
  }

  async function confirm() {
    if (!deleteTarget) return;
    const success = await deleteCharacter(deleteTarget.id);
    if (success) {
      setDeleteTarget(null);
    }
  }

  return {
    isOpen,
    deleteTarget,
    isDeleting,
    error,

    open,
    close,
    confirm,
  };
}
