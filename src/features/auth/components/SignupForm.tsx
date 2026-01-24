'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSignup } from '@/features/auth/hooks/useSignup';
import { type SignupInput, signupSchema } from '@/features/auth/schemas/auth';
import { Pages } from '@/libs/pages';

interface Props {
  redirectTo?: string;
}

// TODO: 仮コンポーネント
export function SignupForm({ redirectTo = Pages.home.path() }: Props) {
  const { signup, isLoading, error } = useSignup(redirectTo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  function onSubmit(data: SignupInput) {
    signup(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p>{error}</p>}

      <div>
        <label htmlFor="displayName">表示名（20文字以内）</label>
        <br />
        <input
          id="displayName"
          type="text"
          autoComplete="name"
          {...register('displayName')}
          className="border"
        />
        {errors.displayName && <p>{errors.displayName.message}</p>}
      </div>

      <div>
        <label htmlFor="email">メールアドレス</label>
        <br />
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email')}
          className="border"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">パスワード（8文字以上）</label>
        <br />
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          {...register('password')}
          className="border"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword">パスワード（確認）</label>
        <br />
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          {...register('confirmPassword')}
          className="border"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit" disabled={isLoading} className="border">
        {isLoading ? '登録中...' : '新規登録'}
      </button>
    </form>
  );
}
