import type { Metadata } from 'next';
import { Suspense } from 'react';

import { FavoriteUsers } from '@/features/home/components/FavoriteUsers';
import { FavoriteUsersSkeleton } from '@/features/home/components/FavoriteUsersSkeleton';
import { RecentlyPlayed } from '@/features/home/components/RecentlyPlayed';
import { RecentlyPlayedSkeleton } from '@/features/home/components/RecentlyPlayedSkeleton';
import { RecommendedChannels } from '@/features/home/components/RecommendedChannels';
import { RecommendedChannelsSkeleton } from '@/features/home/components/RecommendedChannelsSkeleton';
import { RecommendedEpisodes } from '@/features/home/components/RecommendedEpisodes';
import { RecommendedEpisodesSkeleton } from '@/features/home/components/RecommendedEpisodesSkeleton';
import { auth } from '@/libs/auth/auth';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.home.title,
};

export default async function HomePage() {
  const { isLoggedIn } = await auth();

  return (
    <div className="flex flex-col gap-6">
      {/* おすすめのエピソード */}
      <Suspense fallback={<RecommendedEpisodesSkeleton />}>
        <RecommendedEpisodes />
      </Suspense>

      {/* おすすめのチャンネル */}
      <Suspense fallback={<RecommendedChannelsSkeleton />}>
        <RecommendedChannels />
      </Suspense>

      {/* お気に入りのユーザー */}
      <Suspense fallback={<FavoriteUsersSkeleton />}>
        <FavoriteUsers />
      </Suspense>

      {/* 最近聴いたコンテンツ（ログイン時のみ） */}
      {isLoggedIn && (
        <Suspense fallback={<RecentlyPlayedSkeleton />}>
          <RecentlyPlayed />
        </Suspense>
      )}
    </div>
  );
}
