import Link from 'next/link';
import { Sidebar } from '@/features/app/ui/Sidebar';
import { auth } from '@/libs/auth/auth';
import { Paths } from '@/libs/paths';

interface Props {
  children: React.ReactNode;
}

const menuItems = [
  { label: 'ホーム', href: Paths.home() },
  { label: '検索', href: Paths.search() },
];

const libraryItems = [
  { label: '再生履歴', href: Paths.library.history() },
  { label: 'お気に入り', href: Paths.library.favorites() },
  { label: 'フォロー中', href: Paths.library.following() },
];

export async function MainLayout({ children }: Props) {
  const session = await auth();

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

          {!!session && (
            <div className="mt-2">
              <p className="px-3 py-2 text-sm">[ライブラリ]</p>
              {libraryItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2"
                >
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
