import type { CSSProperties } from 'react';
import { cn } from '@/utils/cn';

interface Props {
  style?: CSSProperties;
  className?: string;
}

export function Skeleton({ className, style }: Props) {
  return (
    <div
      style={style}
      className={cn('animate-pulse rounded-md bg-bg-elevated', className)}
    />
  );
}
