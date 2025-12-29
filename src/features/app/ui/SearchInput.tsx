'use client';

import { useRouter } from 'next/navigation';
import { Pages } from '@/libs/pages';

// TODO: 仮コンポーネント
export function SearchInput() {
  const router = useRouter();

  const handleFocus = () => {
    router.push(Pages.search.path());
  };

  return (
    <input
      type="text"
      placeholder="検索"
      className="border"
      onFocus={handleFocus}
    />
  );
}
