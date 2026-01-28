'use client';

import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { XIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Size = 'sm' | 'md' | 'lg';

interface Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  children: ReactNode;
}

interface ContentProps {
  size?: Size;
  className?: string;
  children: ReactNode;
}

interface TitleProps {
  className?: string;
  children: ReactNode;
}

interface DescriptionProps {
  className?: string;
  children: ReactNode;
}

interface CloseProps {
  className?: string;
  children?: ReactNode;
}

interface FooterProps {
  className?: string;
  children: ReactNode;
}

const sizeClasses: Record<Size, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

function Root({ open, onOpenChange, defaultOpen, children }: Props) {
  return (
    <BaseDialog.Root
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
    >
      {children}
    </BaseDialog.Root>
  );
}

interface TriggerProps {
  className?: string;
  children: ReactNode;
}

function Trigger({ className, children }: TriggerProps) {
  return (
    <BaseDialog.Trigger className={className}>{children}</BaseDialog.Trigger>
  );
}

function Content({ size = 'md', className, children }: ContentProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />

      <BaseDialog.Popup
        className={cn(
          'fixed top-1/2 left-1/2 z-50 w-[calc(100%-32px)] -translate-x-1/2 -translate-y-1/2 rounded-md border border-border bg-bg-surface p-6',
          'transition-all duration-200',
          'data-starting-style:scale-95 data-starting-style:opacity-0',
          'data-ending-style:scale-95 data-ending-style:opacity-0',
          sizeClasses[size],
          className,
        )}
      >
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

function Title({ className, children }: TitleProps) {
  return (
    <BaseDialog.Title
      className={cn('text-lg font-semibold text-text-main', className)}
    >
      {children}
    </BaseDialog.Title>
  );
}

function Description({ className, children }: DescriptionProps) {
  return (
    <BaseDialog.Description
      className={cn('mt-2 text-sm text-text-subtle', className)}
    >
      {children}
    </BaseDialog.Description>
  );
}

function Close({ className, children }: CloseProps) {
  const isIconButton = !children;

  return (
    <BaseDialog.Close
      className={cn(
        isIconButton &&
          'absolute top-4 right-4 cursor-pointer text-text-subtle transition-colors hover:text-text-main',
        className,
      )}
    >
      {children ?? <XIcon size={20} aria-label="閉じる" />}
    </BaseDialog.Close>
  );
}

function Footer({ className, children }: FooterProps) {
  return (
    <div className={cn('mt-6 flex justify-end gap-3', className)}>
      {children}
    </div>
  );
}

export const Dialog = {
  Root,
  Trigger,
  Content,
  Title,
  Description,
  Close,
  Footer,
};
