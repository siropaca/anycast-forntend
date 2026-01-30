'use client';

import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import { ARTWORK_SIZE } from '@/features/home/constants/layout';
import { Pages } from '@/libs/pages';

// TODO: モック実装
const mockFavoriteUsers = [
  { id: 1, title: 'さくら', subtext: '@sakura' },
  { id: 2, title: '知世', subtext: '@tomoyo' },
  { id: 3, title: '小狼', subtext: '@syaoran' },
  { id: 4, title: 'エリオル', subtext: '@eriol' },
  { id: 5, title: '雪兎', subtext: '@yukito' },
  { id: 6, title: '桃矢', subtext: '@touya' },
  { id: 7, title: '苺鈴', subtext: '@meiling' },
  { id: 8, title: '奈久留', subtext: '@nakuru' },
];

export function FavoriteUsers() {
  return (
    <ContentSection title="お気に入りのユーザー" moreHref={Pages.library.following.path()}>
      {mockFavoriteUsers.map((user) => (
        <Artwork
          key={user.id}
          src={`https://picsum.photos/seed/user-${user.id}/400/400`}
          title={user.title}
          subtext={user.subtext}
          size={ARTWORK_SIZE}
          rounded
        />
      ))}
    </ContentSection>
  );
}
