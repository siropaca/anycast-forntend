import { CalendarBlankIcon } from '@phosphor-icons/react';

import { formatYearMonth } from '@/utils/date';

interface Props {
  displayName: string;
  username: string;
  bio: string;
  createdAt: string;
  followerCount: number;
  followingCount: number;
}

export function UserProfileInfo({
  displayName,
  username,
  bio,
  createdAt,
  followerCount,
  followingCount,
}: Props) {
  return (
    <div className="mt-4 space-y-3">
      <div>
        <h1 className="text-xl font-bold">{displayName}</h1>
        <p className="text-text-subtle">@{username}</p>
      </div>

      {bio && (
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{bio}</p>
      )}

      <div className="flex gap-4 text-sm">
        <p>
          <span className="font-bold">{followingCount}</span>
          <span className="ml-1 text-text-subtle">フォロー中</span>
        </p>
        <p>
          <span className="font-bold">{followerCount}</span>
          <span className="ml-1 text-text-subtle">フォロワー</span>
        </p>
      </div>

      <p className="flex items-center gap-1.5 text-sm text-text-subtle">
        <CalendarBlankIcon size={16} />
        {formatYearMonth(new Date(createdAt))}に登録
      </p>
    </div>
  );
}
