'use client';

import { Dialog } from '@base-ui/react/dialog';
import type { ReactNode } from 'react';

interface Props {
  id?: string;
  className?: string;
  children: ReactNode;
}

export function DrawerTrigger({ id, className, children }: Props) {
  return (
    <Dialog.Trigger id={id} className={className}>
      {children}
    </Dialog.Trigger>
  );
}
