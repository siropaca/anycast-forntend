import Link from 'next/link';
import { Sidebar } from '@/features/app/ui/Sidebar';
import { Paths } from '@/libs/paths';

interface Props {
  children: React.ReactNode;
}

const menuItems = [
  { label: 'アカウント', href: Paths.settings.index() },
  { label: 'サブスクリプション', href: '#' },
];

export function SettingsLayout({ children }: Props) {
  return (
    <div className="flex flex-1">
      {/* サイドバー */}
      <Sidebar>
        <nav className="flex flex-col gap-1 p-4">
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href} className="px-3 py-2">
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
