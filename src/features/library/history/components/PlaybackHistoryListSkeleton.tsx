import { ArtworkSkeleton } from '@/components/dataDisplay/artworks/Artwork/ArtworkSkeleton';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { Pages } from '@/libs/pages';

const SKELETON_COUNT = 12;

export function PlaybackHistoryListSkeleton() {
  return (
    <div>
      <SectionTitle title={Pages.library.history.pageTitle} />

      <ArtworkGrid>
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
          <ArtworkSkeleton key={i} />
        ))}
      </ArtworkGrid>
    </div>
  );
}
