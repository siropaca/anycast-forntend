'use client';

import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/inputs/Input/Input';
import { useDebounce } from '@/hooks/useDebounce';
import { Pages } from '@/libs/pages';

export function HeaderSearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get('q') ?? '');
  const debouncedValue = useDebounce(value, 300);
  const hasInteracted = useRef(false);

  useEffect(() => {
    if (!pathname.startsWith('/explore')) {
      setValue('');
      hasInteracted.current = false;
    }
  }, [pathname]);

  useEffect(() => {
    if (!hasInteracted.current) {
      return;
    }

    router.push(Pages.explore.path({ q: debouncedValue || undefined }));
  }, [debouncedValue, router]);

  function handleFocus() {
    router.push(Pages.explore.path({ q: value || undefined }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    hasInteracted.current = true;
    setValue(e.target.value);
  }

  function handleClear() {
    hasInteracted.current = true;
    setValue('');
    router.push(Pages.explore.path());
  }

  return (
    <Input
      type="text"
      placeholder="何を聴きたいですか？"
      value={value}
      leftIcon={<MagnifyingGlassIcon />}
      clearable
      className="w-90 rounded-full"
      onFocus={handleFocus}
      onChange={handleChange}
      onClear={handleClear}
    />
  );
}
