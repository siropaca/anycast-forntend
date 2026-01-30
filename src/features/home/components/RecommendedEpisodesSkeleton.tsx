import { ARTWORK_FIXED_SIZE } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ArtworkSkeleton } from '@/components/dataDisplay/artworks/Artwork/ArtworkSkeleton';
import { ContentSection } from '@/components/surface/ContentSection/ContentSection';

const SKELETON_COUNT = 8;

export function RecommendedEpisodesSkeleton() {
  return (
    <ContentSection title="おすすめのエピソード">
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
        <ArtworkSkeleton key={i} size={ARTWORK_FIXED_SIZE} />
      ))}
    </ContentSection>
  );
}
