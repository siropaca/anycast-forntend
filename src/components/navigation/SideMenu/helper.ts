import type { MenuSection } from '@/components/navigation/SideMenu/SideMenu';

/**
 * パスから query string を除去する
 *
 * @param path - パス
 * @returns query string を除去したパス
 *
 * @example
 * removeQueryString('/explore?q=test') // => '/explore'
 * removeQueryString('/settings') // => '/settings'
 */
export function removeQueryString(path: string): string {
  const index = path.indexOf('?');
  return index === -1 ? path : path.slice(0, index);
}

/**
 * 現在のパスがメニューアイテムのパスと一致するかを判定する（完全一致）
 *
 * @param pathname - 現在のパス（query string を含む場合があるので除去する）
 * @param href - メニューアイテムのパス
 * @param matchPaths - 追加でマッチさせるパス
 * @returns 一致する場合は true
 *
 * @example
 * isActivePath('/settings/account', '/settings/account') // => true
 * isActivePath('/settings/account?tab=1', '/settings/account') // => true
 * isActivePath('/settings', '/settings/account', ['/settings']) // => true
 * isActivePath('/studio/dashboard', '/studio/channels') // => false
 */
export function isActivePath(
  pathname: string,
  href: string,
  matchPaths?: string[],
): boolean {
  const normalizedPathname = removeQueryString(pathname);
  const paths = [href, ...(matchPaths ?? [])];

  return paths.includes(normalizedPathname);
}

/**
 * セクションの各アイテムに isActive を付与する
 *
 * @param sections - メニューセクション
 * @param pathname - 現在のパス
 * @returns isActive が付与されたセクション
 */
export function withActiveState(
  sections: MenuSection[],
  pathname: string,
): MenuSection[] {
  return sections.map((section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      isActive: isActivePath(pathname, item.href, item.matchPaths),
    })),
  }));
}
