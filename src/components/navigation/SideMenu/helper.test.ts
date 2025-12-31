import { describe, expect, it } from 'vitest';
import {
  isActivePath,
  withActiveState,
} from '@/components/navigation/SideMenu/helper';
import type { MenuSection } from '@/components/navigation/SideMenu/SideMenu';

describe('isActivePath', () => {
  describe('ホームパス（/）の場合', () => {
    it('パスが / の場合は true を返す', () => {
      expect(isActivePath('/', '/')).toBe(true);
    });

    it('パスが / 以外の場合は false を返す', () => {
      expect(isActivePath('/explore', '/')).toBe(false);
      expect(isActivePath('/studio', '/')).toBe(false);
    });
  });

  describe('通常パスの場合', () => {
    it('完全一致の場合は true を返す', () => {
      expect(isActivePath('/studio/channels', '/studio/channels')).toBe(true);
    });

    it('前方一致の場合は true を返す', () => {
      expect(isActivePath('/studio/channels/123', '/studio/channels')).toBe(
        true,
      );
      expect(
        isActivePath('/studio/channels/123/edit', '/studio/channels'),
      ).toBe(true);
    });

    it('一致しない場合は false を返す', () => {
      expect(isActivePath('/studio/dashboard', '/studio/channels')).toBe(false);
      expect(isActivePath('/settings', '/studio')).toBe(false);
    });
  });
});

describe('withActiveState', () => {
  const mockIcon = (() => null) as unknown as MenuSection['items'][0]['icon'];

  it('現在のパスに一致するアイテムに isActive: true を付与する', () => {
    const sections: MenuSection[] = [
      {
        items: [
          { label: 'Home', href: '/', icon: mockIcon },
          { label: 'Explore', href: '/explore', icon: mockIcon },
        ],
      },
    ];

    const result = withActiveState(sections, '/');

    expect(result[0].items[0].isActive).toBe(true);
    expect(result[0].items[1].isActive).toBe(false);
  });

  it('前方一致でアクティブ状態を判定する', () => {
    const sections: MenuSection[] = [
      {
        items: [
          { label: 'Channels', href: '/studio/channels', icon: mockIcon },
          { label: 'Dashboard', href: '/studio/dashboard', icon: mockIcon },
        ],
      },
    ];

    const result = withActiveState(sections, '/studio/channels/123');

    expect(result[0].items[0].isActive).toBe(true);
    expect(result[0].items[1].isActive).toBe(false);
  });

  it('複数セクションを処理できる', () => {
    const sections: MenuSection[] = [
      {
        title: 'Main',
        items: [{ label: 'Home', href: '/', icon: mockIcon }],
      },
      {
        title: 'Library',
        items: [
          { label: 'Favorites', href: '/library/favorites', icon: mockIcon },
        ],
      },
    ];

    const result = withActiveState(sections, '/library/favorites');

    expect(result[0].items[0].isActive).toBe(false);
    expect(result[1].items[0].isActive).toBe(true);
  });

  it('元のセクションを変更しない', () => {
    const sections: MenuSection[] = [
      {
        items: [{ label: 'Home', href: '/', icon: mockIcon }],
      },
    ];

    withActiveState(sections, '/');

    expect(sections[0].items[0].isActive).toBeUndefined();
  });
});
