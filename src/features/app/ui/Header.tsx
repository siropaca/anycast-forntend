import Link from 'next/link';
import { AuthButton } from '@/features/auth/ui/AuthButton';
import { auth } from '@/libs/auth/auth';
import { Paths } from '@/libs/paths';

export async function Header() {
  const session = await auth();

  return (
    <header className="flex h-header items-center justify-between border-b px-4">
      <Link href={Paths.home()} className="text-xl font-bold">
        anycast
      </Link>

      <div className="space-x-6">
        {!!session && (
          <Link href={Paths.studio.index()} className="underline">
            作成
          </Link>
        )}

        {!!session && (
          <Link href={Paths.settings.index()} className="underline">
            設定
          </Link>
        )}

        <AuthButton isLoggedIn={!!session} />
      </div>
    </header>
  );
}
