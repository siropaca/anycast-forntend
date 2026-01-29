/**
 * 変更がある場合に破棄確認ダイアログを表示する
 *
 * @param isDirty - 変更があるかどうか
 * @returns 続行してよい場合は true、キャンセルされた場合は false
 *
 * @example
 * if (!confirmDiscard(isDirty)) return;
 */
export function confirmDiscard(isDirty: boolean): boolean {
  if (!isDirty) return true;
  return window.confirm('入力内容が破棄されますが、よろしいですか？');
}
