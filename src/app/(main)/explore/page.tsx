import type { Metadata } from 'next';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
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

  return (
    <div>
      <SectionTitle title={Pages.explore.title} />

      <div>検索クエリ: {q}</div>
    </div>
  );
}
