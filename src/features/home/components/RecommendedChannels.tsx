'use client';

import Link from 'next/link';

import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import { ContentSectionEmpty } from '@/components/surface/ContentSection/ContentSectionEmpty';
import { RecommendedChannelsSkeleton } from '@/features/home/components/RecommendedChannelsSkeleton';
import { ARTWORK_SIZE } from '@/features/home/constants/layout';
import { useRecommendedChannels } from '@/features/home/hooks/useRecommendedChannels';
import { Pages } from '@/libs/pages';

export function RecommendedChannels() {
  const { channels } = useRecommendedChannels();

  // エンプティ
  if (channels.length === 0) {
    return (
      <ContentSectionEmpty message="おすすめのチャンネルはありません">
        <RecommendedChannelsSkeleton />
      </ContentSectionEmpty>
    );
  }

  // 通常表示
  return (
    <ContentSection
      title="おすすめのチャンネル"
      moreHref={Pages.channels.path()}
    >
      {channels.map((channel) => (
        <Link key={channel.id} href={Pages.channel.path(channel.id)}>
          <Artwork
            src={channel.artwork?.url}
            title={channel.name}
            subtext={channel.category.name}
            size={ARTWORK_SIZE}
          />
        </Link>
      ))}
    </ContentSection>
  );
}
