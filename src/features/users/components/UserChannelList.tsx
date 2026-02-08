import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { ChannelListItem } from '@/features/channels/components/ChannelListItem';
import type { ResponsePublicUserChannelResponse } from '@/libs/api/generated/schemas';

interface Props {
  channels: ResponsePublicUserChannelResponse[];
}

export function UserChannelList({ channels }: Props) {
  return (
    <section className="mt-8">
      <SectionTitle title="チャンネル" />
      {channels.length > 0 ? (
        <div>
          {channels.map((channel) => (
            <ChannelListItem key={channel.id} channel={channel} />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-text-subtle">
          チャンネルはまだありません
        </p>
      )}
    </section>
  );
}
