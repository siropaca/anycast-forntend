import type { Metadata } from 'next';

import { getChannelsChannelId } from '@/libs/api/generated/channels/channels';
import type { ResponseChannelResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

interface Props {
  params: Promise<{ channelSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { channelSlug } = await params;
  const response = await getChannelsChannelId(channelSlug);
  const channel = unwrapResponse<ResponseChannelResponse>(response);

  return {
    title: channel.name,
  };
}

export default async function ChannelPage({ params }: Props) {
  const { channelSlug } = await params;
  const response = await getChannelsChannelId(channelSlug);
  const channel = unwrapResponse<ResponseChannelResponse>(response);

  return (
    <div>
      <div>{channel.name}</div>
    </div>
  );
}
