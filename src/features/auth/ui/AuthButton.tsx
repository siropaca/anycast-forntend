'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Paths } from '@/libs/paths';

interface Props {
  isLoggedIn: boolean;
}

// TODO: 仮コンポーネント
export function AuthButton({ isLoggedIn }: Props) {
  if (isLoggedIn) {
    return (
      <button
        type="button"
        className="border"
        onClick={() => signOut({ callbackUrl: Paths.home() })}
      >
        ログアウト
      </button>
    );
  }

  return (
    <Link href={Paths.login()} className="underline">
      ログイン
    </Link>
  );
}
