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
  icon: ReactNode;
  'aria-label': string;
  size?: ButtonSize;
  color?: ButtonColor;
  variant?: ButtonVariant;
  className?: string;
}

type IconButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type IconButtonAsLink = BaseProps & {
  href: string;
};

type Props = IconButtonAsButton | IconButtonAsLink;

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'size-[var(--size-sm)] text-xs',
  md: 'size-[var(--size-md)] text-sm',
  lg: 'size-[var(--size-lg)] text-base',
};

export function IconButton({
  icon,
  size = 'md',
  color = 'primary',
  variant = 'solid',
  className,
  href,
  ...props
}: Props) {
  const buttonClassName = cn(
    buttonBaseClasses,
    sizeClasses[size],
    colorVariantClasses[color][variant],
    className,
  );

  if (href !== undefined) {
    return (
      <Link
        href={href}
        className={buttonClassName}
        aria-label={props['aria-label']}
      >
        {icon}
      </Link>
    );
  }

  return (
    <button className={buttonClassName} {...props}>
      {icon}
    </button>
  );
}
