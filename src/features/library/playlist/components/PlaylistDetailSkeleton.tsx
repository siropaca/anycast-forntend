import { ArtworkSkeleton } from '@/components/dataDisplay/artworks/Artwork/ArtworkSkeleton';
import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';

const SKELETON_COUNT = 12;

export function PlaylistDetailSkeleton() {
  return (
    <div>
      <div className="mb-4 px-2">
        <Skeleton className="h-7 w-48" />
      </div>

      <ArtworkGrid>
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
          <ArtworkSkeleton key={i} />
        ))}
      </ArtworkGrid>
    </div>
  );
}
