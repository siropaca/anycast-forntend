import type { Metadata } from 'next';
import { Suspense } from 'react';

import {
  ARTWORK_FIXED_SIZE,
  Artwork,
} from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import { RecommendedChannels } from '@/features/home/components/RecommendedChannels';
import { RecommendedChannelsSkeleton } from '@/features/home/components/RecommendedChannelsSkeleton';
import { RecommendedEpisodes } from '@/features/home/components/RecommendedEpisodes';
import { RecommendedEpisodesSkeleton } from '@/features/home/components/RecommendedEpisodesSkeleton';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.home.title,
};

const recentlyPlayed = [
  { id: 1, title: '深夜ラジオ #42', subtext: 'ミッドナイトFM' },
  { id: 2, title: '歴史を紐解く', subtext: 'ヒストリーチャンネル' },
  { id: 3, title: 'ランニング BGM', subtext: 'フィットネスラジオ' },
  { id: 4, title: 'プログラミング雑談', subtext: 'DevTalk' },
  { id: 5, title: '読書の時間', subtext: 'ブックカフェ' },
  { id: 6, title: '旅行プランニング', subtext: 'トラベルガイド' },
  { id: 7, title: 'ゲーム実況振り返り', subtext: 'GameStream' },
];

// TODO: モック実装
export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<RecommendedEpisodesSkeleton />}>
        <RecommendedEpisodes />
      </Suspense>

      <Suspense fallback={<RecommendedChannelsSkeleton />}>
        <RecommendedChannels />
      </Suspense>

      <ContentSection
        title="最近聴いたコンテンツ"
        moreHref={Pages.library.history.path()}
      >
        {recentlyPlayed.map((item) => (
          <Artwork
            key={item.id}
            src={`https://picsum.photos/seed/recent-${item.id}/400/400`}
            title={item.title}
            subtext={item.subtext}
            size={ARTWORK_FIXED_SIZE}
          />
        ))}
      </ContentSection>
    </div>
  );
}
