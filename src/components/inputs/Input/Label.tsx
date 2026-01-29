import type { LabelHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type Props = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

export function Label({
  required = false,
  htmlFor,
  className,
  children,
  ...props
}: Props) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'block text-left text-sm text-text-main',
        className,
      )}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-text-error">*</span>}
    </label>
  );
}
