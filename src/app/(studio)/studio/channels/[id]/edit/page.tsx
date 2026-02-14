import type { Metadata } from 'next';
import { Suspense } from 'react';
import { EditChannel } from '@/features/studio/channels/components/EditChannel';
import { EditChannelSkeleton } from '@/features/studio/channels/components/EditChannelSkeleton';
import { Pages } from '@/libs/pages';
import type { EditChannelParams } from '@/libs/pages/studioPages';

export const metadata: Metadata = {
  title: Pages.studio.editChannel.title,
  robots: { index: false },
};

interface Props {
  params: Promise<EditChannelParams>;
}

export default async function StudioEditChannelPage({ params }: Props) {
  const { id } = await params;

  return (
    <Suspense fallback={<EditChannelSkeleton channelId={id} />}>
      <EditChannel channelId={id} />
    </Suspense>
  );
}
