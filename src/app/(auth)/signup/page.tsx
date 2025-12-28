import type { Metadata } from 'next';
import Link from 'next/link';
import { OAuthButtons } from '@/components/auth/OAuthButtons';
import { SignupForm } from '@/components/auth/SignupForm';
import { Paths } from '@/libs/paths';

export const metadata: Metadata = {
  title: '新規登録',
};

export default function SignupPage() {
  return (
    <div>
      <h1>新規登録</h1>

      <SignupForm />

      <hr />

      <OAuthButtons />

      <p>
        すでにアカウントをお持ちの方は{' '}
        <Link href={Paths.login()} className="underline">
          ログイン
        </Link>
      </p>
    </div>
  );
}
