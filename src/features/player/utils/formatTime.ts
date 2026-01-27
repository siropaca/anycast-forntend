/**
 * ミリ秒を m:ss 形式の文字列に変換する
 *
 * @param ms - ミリ秒
 * @returns m:ss 形式の文字列
 *
 * @example
 * formatTime(83000) // => '1:23'
 * formatTime(5000) // => '0:05'
 * formatTime(754000) // => '12:34'
 */
export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
