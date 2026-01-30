import type { LabelHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type Props = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
  description?: string;
};

export function FormLabel({
  required = false,
  description,
  htmlFor,
  className,
  children,
  ...props
}: Props) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('block text-left text-sm text-text-main', className)}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-1 inline-block text-text-required">*</span>
      )}
      {description && (
        <>
          <br />
          <span className="text-text-subtle text-xs">{description}</span>
        </>
      )}
    </label>
  );
}
