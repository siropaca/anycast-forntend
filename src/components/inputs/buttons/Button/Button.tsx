import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/inputs/buttons/buttonVariants';
import {
  buttonBaseClasses,
  colorVariantClasses,
} from '@/components/inputs/buttons/buttonVariants';
import { cn } from '@/utils/cn';

interface BaseProps {
  size?: ButtonSize;
  color?: ButtonColor;
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps & {
  href: string;
};

type Props = ButtonAsButton | ButtonAsLink;

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-[var(--size-sm)] px-3 text-xs gap-1',
  md: 'h-[var(--size-md)] px-4 text-sm gap-1.5',
  lg: 'h-[var(--size-lg)] px-5 text-base gap-2',
};

export function Button({
  size = 'md',
  color = 'primary',
  variant = 'solid',
  leftIcon,
  rightIcon,
  className,
  children,
  href,
  ...props
}: Props) {
  const buttonClassName = cn(
    buttonBaseClasses,
    sizeClasses[size],
    colorVariantClasses[color][variant],
    className,
  );

  const content = (
    <>
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span className="truncate">{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </>
  );

  if (href !== undefined) {
    return (
      <Link href={href} className={buttonClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button className={buttonClassName} {...props}>
      {content}
    </button>
  );
}
