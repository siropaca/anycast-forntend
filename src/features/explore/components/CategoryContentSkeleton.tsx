import { ArtworkSkeleton } from '@/components/dataDisplay/artworks/Artwork/ArtworkSkeleton';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';

const SKELETON_COUNT = 6;

export function CategoryContentSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex min-h-(--size-md) items-center">
        <div className="h-7 w-40 rounded bg-bg-elevated" />
      </div>

      <section>
        <div className="flex min-h-(--size-md) items-center">
          <div className="h-6 w-60 rounded bg-bg-elevated" />
        </div>

        <ArtworkGrid>
          {Array.from({ length: SKELETON_COUNT }, (_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
            <ArtworkSkeleton key={i} />
          ))}
        </ArtworkGrid>
      </section>

      <section>
        <div className="flex min-h-(--size-md) items-center">
          <div className="h-6 w-60 rounded bg-bg-elevated" />
        </div>

        <ArtworkGrid>
          {Array.from({ length: SKELETON_COUNT }, (_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
            <ArtworkSkeleton key={i} />
          ))}
        </ArtworkGrid>
      </section>
    </div>
  );
}
