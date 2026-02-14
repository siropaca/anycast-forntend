import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CreateEpisode } from '@/features/studio/episodes/components/CreateEpisode';
import { CreateEpisodeSkeleton } from '@/features/studio/episodes/components/CreateEpisodeSkeleton';
import { Pages } from '@/libs/pages';
import type { NewEpisodeParams } from '@/libs/pages/studioPages';

export const metadata: Metadata = {
  title: Pages.studio.newEpisode.title,
  robots: { index: false },
};

interface Props {
  params: Promise<NewEpisodeParams>;
}

export default async function StudioNewEpisodePage({ params }: Props) {
  const { id } = await params;

  return (
    <Suspense fallback={<CreateEpisodeSkeleton channelId={id} />}>
      <CreateEpisode channelId={id} />
    </Suspense>
  );
}
