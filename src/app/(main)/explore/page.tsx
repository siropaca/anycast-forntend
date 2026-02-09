import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { CategoryList } from '@/features/explore/components/CategoryList';
import { CategoryListSkeleton } from '@/features/explore/components/CategoryListSkeleton';
import { SearchResults } from '@/features/explore/components/SearchResults';
import { Pages } from '@/libs/pages';
import type { ExploreSearchParams } from '@/libs/pages/mainPages';

export const metadata: Metadata = {
  title: Pages.explore.title,
};

interface Props {
  searchParams: Promise<ExploreSearchParams>;
}

export default async function ExplorePage({ searchParams }: Props) {
  const { q } = await searchParams;

  if (q) {
    return (
      <div>
        <SectionTitle
          title={Pages.explore.title}
          description={`「${q}」の検索結果`}
        />
        <SearchResults query={q} />
      </div>
    );
  }

  return (
    <div>
      <SectionTitle title={Pages.explore.title} />

      <Suspense fallback={<CategoryListSkeleton />}>
        <CategoryList />
      </Suspense>
    </div>
  );
}
