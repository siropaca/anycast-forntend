import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Size = 'sm' | 'md' | 'lg';
type Color = 'primary' | 'white';
type Variant = 'solid' | 'outline';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
  color?: Color;
  variant?: Variant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-[var(--size-sm)] px-3 text-xs gap-1',
  md: 'h-[var(--size-md)] px-4 text-sm gap-1.5',
  lg: 'h-[var(--size-lg)] px-5 text-base gap-2',
};

const colorVariantClasses: Record<Color, Record<Variant, string>> = {
  primary: {
    solid:
      'bg-primary text-white border-transparent enabled:hover:bg-primary/80 enabled:active:bg-primary/70',
    outline:
      'bg-transparent text-primary border-primary enabled:hover:bg-primary/10 enabled:active:bg-primary/20',
  },
  white: {
    solid:
      'bg-white text-black border-transparent enabled:hover:bg-white/80 enabled:active:bg-white/70',
    outline:
      'bg-transparent text-white border-white enabled:hover:bg-white/10 enabled:active:bg-white/20',
  },
};

export function Button({
  size = 'md',
  color = 'primary',
  variant = 'solid',
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        'inline-flex cursor-pointer items-center justify-center rounded-full border font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        sizeClasses[size],
        colorVariantClasses[color][variant],
        className,
      )}
      {...props}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
