'use client';

import { QueryClient } from '@tanstack/react-query';
import { useState } from 'react';

/**
 * QueryClient インスタンスを生成・保持するカスタムフック
 *
 * @returns QueryClient インスタンス
 */
export function useQueryClient(): QueryClient {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1min
          },
        },
      }),
  );

  return queryClient;
}
