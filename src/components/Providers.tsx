'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { useQueryClient } from '@/libs/api/useQueryClient';

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  const queryClient = useQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
}
