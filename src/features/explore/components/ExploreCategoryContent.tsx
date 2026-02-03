'use client';

import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { CategoryChannelList } from '@/features/explore/components/CategoryChannelList';
import { CategoryEpisodeList } from '@/features/explore/components/CategoryEpisodeList';
import { useCategory } from '@/features/explore/hooks/useCategory';

interface Props {
  categorySlug: string;
}

export function ExploreCategoryContent({ categorySlug }: Props) {
  const { category } = useCategory(categorySlug);

  return (
    <div className="space-y-6">
      <SectionTitle title={category.name} />

      <section>
        <SectionTitle
          title={`おすすめの${category.name}チャンネル`}
          level="h3"
        />
        <CategoryChannelList categorySlug={categorySlug} />
      </section>

      <section>
        <SectionTitle
          title={`おすすめの${category.name}エピソード`}
          level="h3"
        />
        <CategoryEpisodeList categorySlug={categorySlug} />
      </section>
    </div>
  );
}
