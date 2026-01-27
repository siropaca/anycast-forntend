'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/utils/cn';

type Size = 'sm' | 'md' | 'lg';

interface Props {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: Size;
  className?: string;
}

const sizeClasses: Record<Size, string> = {
  sm: 'size-[var(--size-sm)] text-xs',
  md: 'size-[var(--size-md)] text-sm',
  lg: 'size-[var(--size-lg)] text-base',
};

export function Avatar({
  src,
  alt = '',
  fallback,
  size = 'md',
  className,
}: Props) {
  const [hasError, setHasError] = useState(false);

  const showFallback = !src || hasError;

  function handleError() {
    setHasError(true);
  }

  return (
    <div
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
        showFallback && 'bg-bg-elevated text-white',
        sizeClasses[size],
        className,
      )}
    >
      {showFallback ? (
        <span className="font-medium">{fallback}</span>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          onError={handleError}
          className="object-cover"
        />
      )}
    </div>
  );
}
