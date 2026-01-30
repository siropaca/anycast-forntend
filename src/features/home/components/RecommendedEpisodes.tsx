'use client';

import {
  ARTWORK_FIXED_SIZE,
  Artwork,
} from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import { ContentSectionEmpty } from '@/components/surface/ContentSection/ContentSectionEmpty';
import { RecommendedEpisodesSkeleton } from '@/features/home/components/RecommendedEpisodesSkeleton';
import {
  getEpisodeArtworkUrl,
  useRecommendedEpisodes,
} from '@/features/home/hooks/useRecommendedEpisodes';

export function RecommendedEpisodes() {
  const { episodes } = useRecommendedEpisodes();

  // エンプティ
  if (episodes.length === 0) {
    return (
      <ContentSectionEmpty message="エピソードはありません">
        <RecommendedEpisodesSkeleton />
      </ContentSectionEmpty>
    );
  }

  // 通常表示
  return (
    <ContentSection title="おすすめのエピソード" moreHref="/episodes">
      {episodes.map((episode) => (
        <Artwork
          key={episode.id}
          src={getEpisodeArtworkUrl(episode)}
          title={episode.title}
          subtext={episode.channel.name}
          size={ARTWORK_FIXED_SIZE}
        />
      ))}
    </ContentSection>
  );
}
