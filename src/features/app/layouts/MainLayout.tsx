import { HouseIcon } from '@phosphor-icons/react/ssr';
import { Sidebar } from '@/components/navigation/Sidebar';
import type { MenuSection } from '@/components/navigation/SideMenu';
import { SideMenu } from '@/components/navigation/SideMenu';
import { auth } from '@/libs/auth/auth';
import { Pages } from '@/libs/pages';

interface Props {
  children: React.ReactNode;
}

const MENU_SECTIONS: MenuSection[] = [
  {
    items: [
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
    ],
  },
  {
    title: 'ライブラリ',
    items: [
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
    ],
  },
];

const MY_PAGE_SECTION: MenuSection = {
  title: 'マイページ',
  items: [
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
  ],
};

// TODO: 仮コンポーネント
export async function MainLayout({ children }: Props) {
  const { isLoggedIn } = await auth();

  const sections = isLoggedIn
    ? [...MENU_SECTIONS, MY_PAGE_SECTION]
    : MENU_SECTIONS;

  return (
    <div className="flex flex-1">
      {/* サイドバー */}
      <Sidebar>
        <SideMenu sections={sections} />
      </Sidebar>

      {/* コンテンツ */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
