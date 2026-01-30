import { ArtworkSkeleton } from '@/components/dataDisplay/artworks/Artwork/ArtworkSkeleton';
import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import { ARTWORK_SIZE } from '@/features/home/constants/layout';

const SKELETON_COUNT = 8;

export function FavoriteUsersSkeleton() {
  return (
    <ContentSection title="お気に入りのユーザー">
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
        <ArtworkSkeleton key={i} size={ARTWORK_SIZE} />
      ))}
    </ContentSection>
  );
}
