'use client';

import { useGetMeChannelsSuspense } from '@/libs/api/generated/me/me';

export function ChannelList() {
  const { data } = useGetMeChannelsSuspense();

  const channels = data?.status === 200 ? data.data.data : [];

  if (!channels || channels.length === 0) {
    return <p>チャンネルがありません</p>;
  }

  return (
    <ul>
      {channels.map((channel) => (
        <li key={channel.id}>{channel.name}</li>
      ))}
    </ul>
  );
}
