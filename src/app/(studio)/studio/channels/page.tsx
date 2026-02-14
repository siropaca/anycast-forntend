import { PlusIcon } from '@phosphor-icons/react/ssr';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { ChannelList } from '@/features/studio/channels/components/ChannelList';
import { ChannelListSkeleton } from '@/features/studio/channels/components/ChannelListSkeleton';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.channels.title,
  robots: { index: false },
};

export default function StudioChannelsPage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title={Pages.studio.channels.title}
        description="作成したチャンネルの管理ができます"
        action={
          <Button
            href={Pages.studio.newChannel.path()}
            leftIcon={<PlusIcon size={18} />}
          >
            新規追加
          </Button>
        }
      />

      <Suspense fallback={<ChannelListSkeleton />}>
        <ChannelList />
      </Suspense>
    </div>
  );
}
