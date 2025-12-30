import type { Icon } from '@phosphor-icons/react';
import { HouseIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import { Sidebar } from '@/components/navigation/Sidebar';
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
    label: Pages.studio.dashboard.title,
    href: Pages.studio.dashboard.path(),
    icon: HouseIcon,
  },
  {
    label: Pages.studio.channels.title,
    href: Pages.studio.channels.path(),
    icon: HouseIcon,
  },
];

// TODO: 仮コンポーネント
export function StudioLayout({ children }: Props) {
  return (
    <div className="flex flex-1">
      {/* サイドバー */}
      <Sidebar>
        <nav className="flex flex-col gap-1 p-4">
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
        </nav>
      </Sidebar>

      {/* コンテンツ */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
