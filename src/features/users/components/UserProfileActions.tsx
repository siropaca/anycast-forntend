'use client';

import { PencilSimpleIcon } from '@phosphor-icons/react';
import { useState } from 'react';

import { Button } from '@/components/inputs/buttons/Button/Button';
import { UserProfileEditModal } from '@/features/users/components/UserProfileEditModal';
import { useFollowUser } from '@/features/users/hooks/useFollowUser';
import type { ResponsePublicUserResponse } from '@/libs/api/generated/schemas';

interface Props {
  user: ResponsePublicUserResponse;
  username: string;
  isOwnProfile: boolean;
  isLoggedIn: boolean;
}

export function UserProfileActions({
  user,
  username,
  isOwnProfile,
  isLoggedIn,
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { isFollowing, isPending, toggleFollow } = useFollowUser(username);

  if (isOwnProfile) {
    return (
      <>
        <Button
          variant="outline"
          color="secondary"
          leftIcon={<PencilSimpleIcon size={16} />}
          onClick={() => setIsEditModalOpen(true)}
        >
          プロフィール編集
        </Button>

        <UserProfileEditModal
          user={user}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
        />
      </>
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
      onClick={toggleFollow}
    >
      {isFollowing ? 'フォロー中' : 'フォローする'}
    </Button>
  );
}
