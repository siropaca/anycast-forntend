import { ArtworkSkeleton } from '@/components/dataDisplay/artworks/Artwork/ArtworkSkeleton';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';

const SKELETON_COUNT = 19;

export function CategoryListSkeleton() {
  return (
    <ArtworkGrid>
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
        <ArtworkSkeleton key={i} hasSubtext={false} />
      ))}
    </ArtworkGrid>
  );
}
