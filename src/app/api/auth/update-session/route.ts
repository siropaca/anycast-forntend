import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { decode, encode } from 'next-auth/jwt';

const COOKIE_NAME = 'authjs.session-token';

/**
 * セッションの username を更新する Route Handler
 *
 * Server Action の cookies().set() は Next.js 16 でブラウザに永続化されないため、
 * NextResponse で直接 Set-Cookie ヘッダーを返す。
 */
export async function PATCH(request: NextRequest) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 },
    );
  }

  const { username } = (await request.json()) as { username: string };
  if (!username) {
    return NextResponse.json({ error: 'Username required' }, { status: 400 });
  }

  const sessionCookie = request.cookies.get(COOKIE_NAME);
  if (!sessionCookie?.value) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const payload = await decode({
    token: sessionCookie.value,
    secret,
    salt: COOKIE_NAME,
  });
  if (!payload) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  payload.username = username;

  const newToken = await encode({
    token: payload,
    secret,
    salt: COOKIE_NAME,
  });

  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, newToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  // 全ルートの Router Cache を無効化して、サーバーコンポーネントが新しい JWT を読むようにする
  revalidatePath('/', 'layout');

  return response;
}
