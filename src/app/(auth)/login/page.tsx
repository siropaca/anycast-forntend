import type { Metadata } from 'next';
import Link from 'next/link';
import { LoginForm } from '@/features/auth/ui/LoginForm';
import { OAuthButtons } from '@/features/auth/ui/OAuthButtons';
import { Paths } from '@/libs/paths';

export const metadata: Metadata = {
  title: 'ログイン',
};

export default function LoginPage() {
  return (
    <div>
      <h1>ログイン</h1>

      <LoginForm />

      <hr />

      <OAuthButtons />

      <p>
        アカウントをお持ちでない方は{' '}
        <Link href={Paths.signup()} className="underline">
          新規登録
        </Link>
      </p>
    </div>
  );
}
