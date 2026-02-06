import { useCallback } from 'react';

const DEFAULT_MESSAGE = '保存されていない変更があります。変更を破棄しますか？';

/**
 * フォーム編集中にモーダルを閉じる操作をガードするフック
 *
 * isDirty が true の状態で閉じようとすると window.confirm で確認を求める。
 *
 * @param onOpenChange - モーダルの open 状態を変更するコールバック
 * @param isDirty - フォームが編集済みかどうか
 * @param message - 確認ダイアログのメッセージ
 * @returns ガード付きの onOpenChange コールバック
 *
 * @example
 * const guardedOnOpenChange = useDiscardGuard(onOpenChange, isDirty)
 * <Modal.Root open={open} onOpenChange={guardedOnOpenChange}>
 */
export function useDiscardGuard(
  onOpenChange: (open: boolean) => void,
  isDirty: boolean,
  message: string = DEFAULT_MESSAGE,
): (open: boolean) => void {
  return useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen && isDirty) {
        const confirmed = window.confirm(message);
        if (!confirmed) return;
      }
      onOpenChange(nextOpen);
    },
    [onOpenChange, isDirty, message],
  );
}
