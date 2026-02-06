import { CaretDownIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Size = 'sm' | 'md' | 'lg';

type Option<T extends string> = {
  label: string;
  value: T;
};

type Props<T extends string> = {
  options: Option<T>[];
  value?: T | null;
  defaultValue?: T;
  onValueChange?: (value: T | null) => void;
  placeholder?: string;
  size?: Size;
  error?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  className?: string;
  name?: string;
  required?: boolean;
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-[var(--size-sm)] px-3 text-xs',
  md: 'h-[var(--size-md)] px-4 text-sm',
  lg: 'h-[var(--size-lg)] px-5 text-base',
};

const gapClasses: Record<Size, string> = {
  sm: 'gap-1.5',
  md: 'gap-2',
  lg: 'gap-3',
};

const iconSizeClasses: Record<Size, string> = {
  sm: '[&>svg]:size-3.5',
  md: '[&>svg]:size-4',
  lg: '[&>svg]:size-5',
};

const caretSizeClasses: Record<Size, string> = {
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-5',
};

export function Select<T extends string>({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = '選択してください',
  size = 'md',
  error = false,
  disabled = false,
  leftIcon,
  className,
  name,
  required,
}: Props<T>) {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = event.target.value;
    onValueChange?.(newValue === '' ? null : (newValue as T));
  }

  const hasValue = value !== undefined && value !== null && value !== '';

  return (
    <div
      className={cn(
        'relative inline-flex items-center rounded-sm border bg-bg-elevated transition-colors',
        'focus-within:ring-2 focus-within:ring-primary',
        disabled && 'cursor-not-allowed opacity-50',
        error ? 'border-border-danger' : 'border-border',
        sizeClasses[size],
        className,
      )}
    >
      {/* select を全面に配置してどこをクリックしても反応するようにする */}
      <select
        name={name}
        required={required}
        disabled={disabled}
        value={value ?? ''}
        defaultValue={value === undefined ? defaultValue : undefined}
        onChange={handleChange}
        className={cn(
          'absolute inset-0 cursor-pointer appearance-none opacity-0',
          'disabled:cursor-not-allowed',
        )}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* 表示用レイヤー（pointer-events-none でクリックを select に透過） */}
      <div className={cn('pointer-events-none flex w-full items-center', gapClasses[size])}>
        {leftIcon && (
          <span
            className={cn(
              'shrink-0 text-text-placeholder',
              iconSizeClasses[size],
            )}
          >
            {leftIcon}
          </span>
        )}

        <span
          className={cn(
            'flex-1 truncate text-left',
            hasValue ? 'text-text-main' : 'text-text-placeholder',
          )}
        >
          {hasValue
            ? options.find((opt) => opt.value === value)?.label
            : placeholder}
        </span>

        <span
          className={cn('shrink-0 text-text-placeholder', caretSizeClasses[size])}
        >
          <CaretDownIcon />
        </span>
      </div>
    </div>
  );
}
