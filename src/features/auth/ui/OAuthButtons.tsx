'use client';

import { signIn } from 'next-auth/react';

// TODO: 仮コンポーネント
export function OAuthButtons() {
  return (
    <div>
      <button
        type="button"
        className="border"
        onClick={() => signIn('google', { callbackUrl: '/' })}
      >
        Google でログイン
      </button>
    </div>
  );
}
