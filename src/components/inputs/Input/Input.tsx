import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Size = 'sm' | 'md' | 'lg';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: boolean;
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-[var(--size-sm)] px-3 text-xs gap-1',
  md: 'h-[var(--size-md)] px-4 text-sm gap-1.5',
  lg: 'h-[var(--size-lg)] px-5 text-base gap-2',
};

const iconSizeClasses: Record<Size, string> = {
  sm: '[&>svg]:size-3.5',
  md: '[&>svg]:size-4',
  lg: '[&>svg]:size-5',
};

export function Input({
  size = 'md',
  leftIcon,
  rightIcon,
  error = false,
  className,
  ...props
}: Props) {
  const hasLeftIcon = !!leftIcon;
  const hasRightIcon = !!rightIcon;

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border bg-transparent transition-colors',
        'focus-within:ring-2 focus-within:ring-primary',
        error ? 'border-border-error' : 'border-border',
        sizeClasses[size],
        className,
      )}
    >
      {leftIcon && (
        <span className={cn('shrink-0 text-placeholder', iconSizeClasses[size])}>
          {leftIcon}
        </span>
      )}
      <input
        className={cn(
          'w-full bg-transparent text-foreground outline-none placeholder:text-placeholder',
          hasLeftIcon && 'pl-0',
          hasRightIcon && 'pr-0',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
        {...props}
      />
      {rightIcon && (
        <span className={cn('shrink-0 text-placeholder', iconSizeClasses[size])}>
          {rightIcon}
        </span>
      )}
    </div>
  );
}
