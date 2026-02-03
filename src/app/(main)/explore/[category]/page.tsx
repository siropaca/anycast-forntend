import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CategoryContentSkeleton } from '@/features/explore/components/CategoryContentSkeleton';
import { ExploreCategoryContent } from '@/features/explore/components/ExploreCategoryContent';
import { Pages } from '@/libs/pages';
import type { ExploreCategoryParams } from '@/libs/pages/mainPages';

export const metadata: Metadata = {
  title: Pages.exploreCategory.title,
};

interface Props {
  params: Promise<ExploreCategoryParams>;
}

export default async function ExploreCategoryPage({ params }: Props) {
  const { category } = await params;

  return (
    <Suspense fallback={<CategoryContentSkeleton />}>
      <ExploreCategoryContent categorySlug={category} />
    </Suspense>
  );
}
