'use client';

import { Dialog } from '@base-ui/react/dialog';
import type { ReactNode } from 'react';

interface Props {
  className?: string;
  children: ReactNode;
}

export function DrawerClose({ className, children }: Props) {
  return <Dialog.Close className={className}>{children}</Dialog.Close>;
}
