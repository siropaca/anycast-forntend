import type { MenuSection } from '@/components/navigation/SideMenu/SideMenu';

/**
 * 現在のパスがメニューアイテムのパスと一致するかを判定する（前方一致）
 *
 * @param pathname - 現在のパス
 * @param href - メニューアイテムのパス
 * @returns 一致する場合は true
 *
 * @example
 * isActivePath('/studio/channels', '/studio/channels') // => true
 * isActivePath('/studio/channels/123', '/studio/channels') // => true
 * isActivePath('/studio/dashboard', '/studio/channels') // => false
 * isActivePath('/', '/') // => true
 * isActivePath('/explore', '/') // => false
 */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname.startsWith(href);
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
      isActive: isActivePath(pathname, item.href),
    })),
  }));
}
