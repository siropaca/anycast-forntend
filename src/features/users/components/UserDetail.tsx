import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import { UserChannelList } from '@/features/users/components/UserChannelList';
import { UserHeaderImage } from '@/features/users/components/UserHeaderImage';
import { UserProfileActions } from '@/features/users/components/UserProfileActions';
import { UserProfileInfo } from '@/features/users/components/UserProfileInfo';
import type { ResponsePublicUserResponse } from '@/libs/api/generated/schemas';
import { getUsersUsername } from '@/libs/api/generated/users/users';
import { unwrapResponse } from '@/libs/api/unwrapResponse';
import { auth } from '@/libs/auth/auth';

const AVATAR_SIZE = 120;

interface Props {
  username: string;
}

export async function UserDetail({ username }: Props) {
  const [userResponse, { session, isLoggedIn }] = await Promise.all([
    getUsersUsername(username),
    auth(),
  ]);
  const user = unwrapResponse<ResponsePublicUserResponse>(userResponse);
  const isOwnProfile = session?.user?.username === username;

  return (
    <div>
      <UserHeaderImage src={user.headerImage?.url} />

      {/* アバター・アクションボタン行 */}
      <div className="flex items-end justify-between">
        <div
          className="relative"
          style={{ marginTop: `-${AVATAR_SIZE / 2}px` }}
        >
          <div className="rounded-full border-4 border-bg-surface">
            <ArtworkImage
              src={user.avatar?.url}
              alt={user.displayName}
              size={AVATAR_SIZE}
              rounded
              priority
            />
          </div>
        </div>

        <UserProfileActions
          user={user}
          username={username}
          isOwnProfile={isOwnProfile}
          isLoggedIn={isLoggedIn}
        />
      </div>

      <UserProfileInfo
        displayName={user.displayName}
        username={user.username}
        bio={user.bio}
        createdAt={user.createdAt}
        followerCount={user.followerCount}
        followingCount={user.followingCount}
      />

      <UserChannelList channels={user.channels} />
    </div>
  );
}
