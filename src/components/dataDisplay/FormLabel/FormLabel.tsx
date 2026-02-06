'use client';

import { QuestionIcon } from '@phosphor-icons/react';
import type { LabelHTMLAttributes } from 'react';
import { Tooltip } from '@/components/dataDisplay/Tooltip/Tooltip';
import { cn } from '@/utils/cn';

type Props = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
  description?: string;
  helpText?: string;
};

export function FormLabel({
  required = false,
  description,
  helpText,
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
      {helpText && (
        <Tooltip label={helpText}>
          <button
            type="button"
            className="ml-1 inline-flex translate-y-0.5 cursor-help text-text-subtle hover:text-text-main"
            onClick={(e) => e.preventDefault()}
          >
            <QuestionIcon size={16} weight="fill" aria-label="ヘルプ" />
          </button>
        </Tooltip>
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
