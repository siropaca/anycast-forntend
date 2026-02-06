'use client';

import { PencilSimpleIcon } from '@phosphor-icons/react';
import Link from 'next/link';

import {
  ARTWORK_FIXED_SIZE,
  Artwork,
} from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import { useFollowUser } from '@/features/users/hooks/useFollowUser';
import { useUser } from '@/features/users/hooks/useUser';
import { Pages } from '@/libs/pages';
import { formatYearMonth } from '@/utils/date';

const AVATAR_SIZE = 120;

interface Props {
  username: string;
  isOwnProfile?: boolean;
  isLoggedIn?: boolean;
}

export function UserDetail({
  username,
  isOwnProfile = false,
  isLoggedIn = false,
}: Props) {
  const { user } = useUser(username);
  const { isFollowing, isPending, toggleFollow } = useFollowUser(username);

  return (
    <div className="space-y-8">
      {/* プロフィールヘッダー */}
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        <ArtworkImage
          src={user.avatar?.url}
          alt={user.displayName}
          size={AVATAR_SIZE}
          rounded
          priority
        />

        <div className="flex flex-col items-center gap-1.5 md:items-start">
          <h1 className="text-2xl font-bold">{user.displayName}</h1>
          <p className="text-text-subtle">@{user.username}</p>
          <p className="text-sm text-text-subtle">
            {formatYearMonth(new Date(user.createdAt))}に登録
          </p>
        </div>
      </div>

      {/* アクションバー */}
      <div className="flex items-center gap-3">
        {isOwnProfile ? (
          <Button
            href={Pages.settings.account.path()}
            variant="outline"
            color="secondary"
            leftIcon={<PencilSimpleIcon size={16} />}
          >
            プロフィール編集
          </Button>
        ) : (
          isLoggedIn && (
            <Button
              variant={isFollowing ? 'outline' : 'solid'}
              color="primary"
              disabled={isPending}
              onClick={toggleFollow}
            >
              {isFollowing ? 'フォロー中' : 'フォローする'}
            </Button>
          )
        )}
      </div>

      {/* チャンネル一覧 */}
      {user.channels.length > 0 ? (
        <ContentSection title="チャンネル">
          {user.channels.map((channel) => (
            <Link
              key={channel.id}
              href={Pages.channel.path({ channelId: channel.id })}
            >
              <Artwork
                src={channel.artwork?.url}
                title={channel.name}
                size={ARTWORK_FIXED_SIZE}
                subtext={channel.category.name}
              />
            </Link>
          ))}
        </ContentSection>
      ) : (
        <section>
          <SectionTitle title="チャンネル" />
          <p className="mt-4 text-sm text-text-subtle">
            チャンネルはまだありません
          </p>
        </section>
      )}
    </div>
  );
}
