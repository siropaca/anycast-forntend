import { ArtworkSkeleton } from '@/components/dataDisplay/artworks/Artwork/ArtworkSkeleton';
import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import { ARTWORK_SIZE } from '@/features/home/constants/layout';

const SKELETON_COUNT = 6;

export function SearchUsersSkeleton() {
  return (
    <ContentSection title="ユーザー" level="h3">
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
        <ArtworkSkeleton key={i} size={ARTWORK_SIZE} rounded />
      ))}
    </ContentSection>
  );
}
