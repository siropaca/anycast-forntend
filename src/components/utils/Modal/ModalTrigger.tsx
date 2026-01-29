'use client';

import { Dialog } from '@base-ui/react/dialog';
import { isValidElement, type ReactNode } from 'react';

interface Props {
  className?: string;
  children: ReactNode;
}

export function ModalTrigger({ className, children }: Props) {
  if (isValidElement(children)) {
    const isNativeButton =
      typeof children.type !== 'string' || children.type === 'button';

    return (
      <Dialog.Trigger
        className={className}
        render={children}
        nativeButton={isNativeButton}
      />
    );
  }
  return <Dialog.Trigger className={className}>{children}</Dialog.Trigger>;
}
