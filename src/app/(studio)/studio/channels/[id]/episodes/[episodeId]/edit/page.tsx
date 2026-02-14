import type { Metadata } from 'next';
import { Suspense } from 'react';
import { EditEpisode } from '@/features/studio/episodes/components/EditEpisode';
import { EditEpisodeSkeleton } from '@/features/studio/episodes/components/EditEpisodeSkeleton';
import { Pages } from '@/libs/pages';
import type { EditEpisodeParams } from '@/libs/pages/studioPages';

export const metadata: Metadata = {
  title: Pages.studio.editEpisode.title,
  robots: { index: false },
};

interface Props {
  params: Promise<EditEpisodeParams>;
}

export default async function StudioEditEpisodePage({ params }: Props) {
  const { id, episodeId } = await params;

  return (
    <Suspense
      fallback={<EditEpisodeSkeleton channelId={id} episodeId={episodeId} />}
    >
      <EditEpisode channelId={id} episodeId={episodeId} />
    </Suspense>
  );
}
