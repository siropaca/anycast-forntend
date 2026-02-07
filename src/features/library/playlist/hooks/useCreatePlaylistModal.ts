import { useState } from 'react';
import { useCreatePlaylist } from '@/features/library/playlist/hooks/useCreatePlaylist';

/**
 * プレイリスト新規作成モーダルの状態を管理するフック
 *
 * @returns モーダルの状態と操作関数
 */
export function useCreatePlaylistModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { createPlaylist, isCreating, error, clearError } = useCreatePlaylist();

  /**
   * モーダルを開く
   */
  function open() {
    clearError();
    setIsOpen(true);
  }

  /**
   * モーダルを閉じる
   */
  function close() {
    setIsOpen(false);
  }

  /**
   * プレイリストを作成し、成功時にモーダルを閉じる
   *
   * @param name - プレイリスト名
   */
  async function submit(name: string) {
    const playlist = await createPlaylist(name);
    if (playlist) {
      setIsOpen(false);
    }
  }

  return {
    isOpen,
    isCreating,
    error,

    open,
    close,
    submit,
  };
}
