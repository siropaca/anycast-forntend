'use client';

import { signOut, useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { Pages } from '@/libs/pages';

/**
 * RefreshTokenError 発生時にセッション再取得を試みる最大回数。
 * レースコンディションで一時的にリフレッシュが失敗した場合、
 * 他のリクエストが既にトークンを更新している可能性があるため、
 * 即座にログアウトせず再取得して確認する。
 */
const MAX_REFRESH_RETRIES = 2;

export function SessionGuard({ children }: { children: React.ReactNode }) {
  const { data: session, update } = useSession();
  const retryCountRef = useRef(0);

  useEffect(() => {
    if (session?.error === 'RefreshTokenError') {
      if (retryCountRef.current < MAX_REFRESH_RETRIES) {
        retryCountRef.current += 1;
        // セッションを再取得する。Cookie が既に更新されていれば成功する
        update();
      } else {
        signOut({ callbackUrl: Pages.login.path() });
      }
    } else {
      retryCountRef.current = 0;
    }
  }, [session?.error, update]);

  return <>{children}</>;
}
