'use client';

import { Toast } from '@base-ui/react/toast';
import { XIcon } from '@phosphor-icons/react';

export function ToastClose() {
  return (
    <Toast.Close
      className="cursor-pointer text-text-subtle transition-colors hover:text-text-main"
      aria-label="閉じる"
    >
      <XIcon size={16} />
    </Toast.Close>
  );
}
