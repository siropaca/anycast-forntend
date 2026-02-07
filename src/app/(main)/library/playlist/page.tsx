import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { PlaylistList } from '@/features/library/playlist/components/PlaylistList';
import { PlaylistListMenu } from '@/features/library/playlist/components/PlaylistListMenu';
import { PlaylistListSkeleton } from '@/features/library/playlist/components/PlaylistListSkeleton';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.library.playList.title,
  robots: { index: false },
};

export default function LibraryPlaylistPage() {
  return (
    <div>
      <SectionTitle
        title={Pages.library.playList.title}
        action={<PlaylistListMenu />}
      />

      <Suspense fallback={<PlaylistListSkeleton />}>
        <PlaylistList />
      </Suspense>
    </div>
  );
}
