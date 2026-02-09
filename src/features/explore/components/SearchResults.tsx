'use client';

import { Suspense } from 'react';
import { SearchChannelsSkeleton } from '@/features/explore/components/SearchChannelsSkeleton';
import { SearchEpisodesSkeleton } from '@/features/explore/components/SearchEpisodesSkeleton';
import { SearchResultsContent } from '@/features/explore/components/SearchResultsContent';
import { SearchUsersSkeleton } from '@/features/explore/components/SearchUsersSkeleton';

interface Props {
  query: string;
}

function SearchResultsSkeleton() {
  return (
    <div className="mt-4 flex flex-col gap-6">
      <SearchEpisodesSkeleton />
      <SearchChannelsSkeleton />
      <SearchUsersSkeleton />
    </div>
  );
}

export function SearchResults({ query }: Props) {
  return (
    <Suspense fallback={<SearchResultsSkeleton />}>
      <SearchResultsContent query={query} />
    </Suspense>
  );
}
