'use client';

import { CategoryEpisodeItem } from '@/features/explore/components/CategoryEpisodeItem';
import { useCategoryEpisodes } from '@/features/explore/hooks/useCategoryEpisodes';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';

interface Props {
  categorySlug: string;
}

export function CategoryEpisodeList({ categorySlug }: Props) {
  const { episodes } = useCategoryEpisodes(categorySlug);

  if (episodes.length === 0) {
    return (
      <p className="py-12 text-center text-text-subtle">
        エピソードがありません
      </p>
    );
  }

  return (
    <ArtworkGrid>
      {episodes.map((episode, index) => (
        <CategoryEpisodeItem
          key={episode.id}
          episode={episode}
          priority={index < 6}
        />
      ))}
    </ArtworkGrid>
  );
}
