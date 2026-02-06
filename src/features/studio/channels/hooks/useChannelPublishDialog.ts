import { useState } from 'react';

type Action = 'publish' | 'unpublish';

interface Params {
  isMutating: boolean;
  error: string | undefined;

  publishChannel: () => Promise<boolean>;
  unpublishChannel: () => Promise<boolean>;
  clearError: () => void;
}

/**
 * チャンネル公開/非公開ダイアログの状態を管理するフック
 *
 * @param params - useChannelDetail から渡される公開関連の値
 * @returns ダイアログの状態と操作関数
 */
export function useChannelPublishDialog({
  publishChannel,
  unpublishChannel,
  clearError,
  isMutating,
  error,
}: Params) {
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState<Action>('publish');

  /**
   * ダイアログを開く
   *
   * @param nextAction - 実行するアクション（公開 or 非公開）
   */
  function open(nextAction: Action) {
    clearError();
    setAction(nextAction);
    setIsOpen(true);
  }

  /**
   * ダイアログを閉じる
   */
  function close() {
    setIsOpen(false);
  }

  /**
   * 公開/非公開を実行する
   *
   * @returns 操作が成功したかどうか
   */
  async function confirm(): Promise<boolean> {
    if (!action) return false;

    const execute = action === 'publish' ? publishChannel : unpublishChannel;
    const success = await execute();
    if (success) {
      setIsOpen(false);
    }
    return success;
  }

  return {
    isOpen,
    action,
    isMutating,
    error,

    open,
    close,
    confirm,
  };
}
