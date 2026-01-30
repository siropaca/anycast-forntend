import { useState } from 'react';
import { useDeleteBgm } from '@/features/studio/bgm/hooks/useDeleteBgm';
import type { ResponseBgmWithEpisodesResponse } from '@/libs/api/generated/schemas';

/**
 * BGM削除ダイアログの状態を管理するフック
 *
 * @returns ダイアログの状態と操作関数
 */
export function useBgmDeleteDialog() {
  const [deleteTarget, setDeleteTarget] =
    useState<ResponseBgmWithEpisodesResponse | null>(null);
  const { deleteBgm, isDeleting, error, clearError } = useDeleteBgm();

  const isOpen = deleteTarget !== null;

  function open(bgm: ResponseBgmWithEpisodesResponse) {
    clearError();
    setDeleteTarget(bgm);
  }

  function close() {
    setDeleteTarget(null);
  }

  async function confirm() {
    if (!deleteTarget) return;
    const success = await deleteBgm(deleteTarget.id);
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
