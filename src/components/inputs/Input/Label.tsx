import type { LabelHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type Props = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

export function Label({
  required = false,
  className,
  children,
  ...props
}: Props) {
  return (
    <label
      className={cn('block text-left text-sm font-medium text-foreground', className)}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-error">*</span>}
    </label>
  );
}
