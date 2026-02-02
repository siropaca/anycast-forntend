import type { Metadata } from 'next';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
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
    <div>
      <SectionTitle title={category} />
    </div>
  );
}
