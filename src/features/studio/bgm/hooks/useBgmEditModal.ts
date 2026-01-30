import { useState } from 'react';
import { useUpdateBgm } from '@/features/studio/bgm/hooks/useUpdateBgm';
import type { ResponseBgmWithEpisodesResponse } from '@/libs/api/generated/schemas';
import { confirmDiscard } from '@/utils/confirmDiscard';

/**
 * BGM編集モーダルの状態を管理するフック
 *
 * @returns モーダルの状態と操作関数
 */
export function useBgmEditModal() {
  const [editTarget, setEditTarget] =
    useState<ResponseBgmWithEpisodesResponse | null>(null);
  const [bgmName, setBgmName] = useState('');
  const { updateBgm, isUpdating, error, clearError } = useUpdateBgm();

  const isOpen = editTarget !== null;
  const isDirty = editTarget !== null && bgmName !== editTarget.name;

  /**
   * モーダルを開く
   *
   * @param bgm - 編集対象のBGM
   */
  function open(bgm: ResponseBgmWithEpisodesResponse) {
    clearError();
    setEditTarget(bgm);
    setBgmName(bgm.name);
  }

  /**
   * モーダルを閉じる（変更がある場合は破棄確認）
   */
  function close() {
    if (!confirmDiscard(isDirty)) return;
    setEditTarget(null);
    setBgmName('');
  }

  /**
   * BGM名の更新を送信する
   */
  async function submit() {
    if (!editTarget) return;
    const success = await updateBgm(editTarget.id, bgmName);
    if (success) {
      setEditTarget(null);
      setBgmName('');
    }
  }

  return {
    isOpen,
    editTarget,
    bgmName,
    setBgmName,
    isDirty,
    isUpdating,
    error,

    open,
    close,
    submit,
  };
}
