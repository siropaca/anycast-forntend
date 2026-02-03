'use client';

import { useChannel } from '@/features/channels/hooks/useChannel';

interface Props {
  channelId: string;
}

export function ChannelDetail({ channelId }: Props) {
  const { channel } = useChannel(channelId);

  return (
    <div>
      <pre>{JSON.stringify(channel, null, 2)}</pre>
    </div>
  );
}
