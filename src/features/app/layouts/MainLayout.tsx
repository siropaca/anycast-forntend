import type { Icon } from '@phosphor-icons/react';
import { HouseIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import { Sidebar } from '@/components/navigation/Sidebar';
import { auth } from '@/libs/auth/auth';
import { Pages } from '@/libs/pages';

interface Props {
  children: React.ReactNode;
}

interface MenuItem {
  label: string;
  href: string;
  icon: Icon;
}

const MENU_ITEMS: MenuItem[] = [
  {
    label: Pages.home.title,
    href: Pages.home.path(),
    icon: HouseIcon,
  },
  {
    label: Pages.explore.title,
    href: Pages.explore.path(),
    icon: HouseIcon,
  },
];

const LIBRARY_ITEMS: MenuItem[] = [
  {
    label: Pages.library.following.title,
    href: Pages.library.following.path(),
    icon: HouseIcon,
  },
  {
    label: Pages.library.bookmarks.title,
    href: Pages.library.bookmarks.path(),
    icon: HouseIcon,
  },
  {
    label: Pages.library.favorites.title,
    href: Pages.library.favorites.path(),
    icon: HouseIcon,
  },
  {
    label: Pages.library.history.title,
    href: Pages.library.history.path(),
    icon: HouseIcon,
  },
];

const MY_PAGE_ITEMS: MenuItem[] = [
  {
    label: '作成したチャンネル',
    href: Pages.studio.channels.path(),
    icon: HouseIcon,
  },
  {
    label: Pages.settings.index.title,
    href: Pages.settings.index.path(),
    icon: HouseIcon,
  },
];

// TODO: 仮コンポーネント
export async function MainLayout({ children }: Props) {
  const { isLoggedIn } = await auth();

  return (
    <div className="flex flex-1">
      {/* サイドバー */}
      <Sidebar>
        <nav className="flex flex-col gap-1 p-4">
          {/* メニューアイテム */}
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3 py-2 flex gap-x-4 items-center"
            >
              <item.icon size={24} />
              {item.label}
            </Link>
          ))}

          {/* ライブラリ */}
          <div className="mt-4">
            <p className="px-3 py-2 text-sm">[ライブラリ]</p>

            {LIBRARY_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-2 flex gap-x-4 items-center"
              >
                <item.icon size={24} />
                {item.label}
              </Link>
            ))}
          </div>

          {/* マイページ */}
          {isLoggedIn && (
            <div className="mt-4">
              <p className="px-3 py-2 text-sm">[マイページ]</p>

              {MY_PAGE_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 flex gap-x-4 items-center"
                >
                  <item.icon size={24} />
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </Sidebar>

      {/* コンテンツ */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
