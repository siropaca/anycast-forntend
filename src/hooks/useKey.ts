import { useCallback, useEffect } from 'react';

type KeyPredicate = (event: KeyboardEvent) => boolean;
type KeyFilter = string | string[] | KeyPredicate;
type Handler = (event: KeyboardEvent) => void;

/**
 * キーボードイベントを監視するフック
 *
 * @param key - 監視するキー（文字列、文字列配列、または判定関数）
 * @param handler - キーが押されたときに実行するハンドラー
 * @param target - イベントを監視する対象（デフォルトはwindow）
 *
 * @example
 * useKey('Escape', () => closeModal())
 * useKey(['Enter', ' '], () => submit())
 * useKey((e) => e.key === 'a' && e.ctrlKey, () => selectAll())
 */
export function useKey(
  key: KeyFilter,
  handler: Handler,
  target?: React.RefObject<HTMLElement | null>,
) {
  const predicate = useCallback(
    (event: KeyboardEvent): boolean => {
      if (typeof key === 'function') {
        return key(event);
      }
      if (Array.isArray(key)) {
        return key.includes(event.key);
      }
      return event.key === key;
    },
    [key],
  );

  useEffect(() => {
    const element = target?.current ?? window;

    function handleKeyDown(event: Event) {
      if (event instanceof KeyboardEvent && predicate(event)) {
        handler(event);
      }
    }

    element.addEventListener('keydown', handleKeyDown);

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [predicate, handler, target]);
}
