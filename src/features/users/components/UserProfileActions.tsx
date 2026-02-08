import { PencilSimpleIcon } from '@phosphor-icons/react';

import { Button } from '@/components/inputs/buttons/Button/Button';
import { Pages } from '@/libs/pages';

interface Props {
  isOwnProfile: boolean;
  isLoggedIn: boolean;
  isFollowing: boolean;
  isPending: boolean;
  onToggleFollow: () => void;
}

export function UserProfileActions({
  isOwnProfile,
  isLoggedIn,
  isFollowing,
  isPending,
  onToggleFollow,
}: Props) {
  if (isOwnProfile) {
    return (
      <Button
        href={Pages.settings.account.path()}
        variant="outline"
        color="secondary"
        leftIcon={<PencilSimpleIcon size={16} />}
      >
        プロフィール編集
      </Button>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Button
      variant={isFollowing ? 'outline' : 'solid'}
      color="primary"
      disabled={isPending}
      onClick={onToggleFollow}
    >
      {isFollowing ? 'フォロー中' : 'フォローする'}
    </Button>
  );
}
