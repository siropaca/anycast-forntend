import Link from 'next/link';
import { AuthButton } from '@/features/auth/ui/AuthButton';
import { auth } from '@/libs/auth/auth';
import { Paths } from '@/libs/paths';

export async function Header() {
  const session = await auth();

  return (
    <header className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
      <Link href={Paths.home()} className="text-xl font-bold">
        anycast
      </Link>

      <AuthButton isLoggedIn={!!session} />
    </header>
  );
}
