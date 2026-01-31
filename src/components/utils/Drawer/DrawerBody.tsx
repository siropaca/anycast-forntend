'use client';

import { ScrollArea } from '@base-ui/react/scroll-area';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface Props {
  className?: string;
  children: ReactNode;
}

export function DrawerBody({ className, children }: Props) {
  return (
    <ScrollArea.Root className={cn('flex-1 min-h-0', className)}>
      <ScrollArea.Viewport className="h-full">{children}</ScrollArea.Viewport>

      <ScrollArea.Scrollbar className="flex w-scrollbar justify-center bg-transparent pl-1">
        <ScrollArea.Thumb className="w-full rounded-full bg-bg-elevated/75" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
