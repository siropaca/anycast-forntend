import type { Metadata } from 'next';
import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';
import { OAuthButtons } from '@/components/auth/OAuthButtons';
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
