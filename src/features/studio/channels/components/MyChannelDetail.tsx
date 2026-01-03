'use client';

import { useRouter } from 'next/navigation';
import { Pages } from '@/libs/pages';

interface Props {
  channelId: string;
}

export function MyChannelDetail({ channelId }: Props) {
  const router = useRouter();

  function handleEditClick() {
    router.push(Pages.studio.editChannel.path({ id: channelId }));
  }

  return (
    <div>
      <h1>{Pages.studio.channel.title}</h1>
      <p>Channel ID: {channelId}</p>

      <button type="button" className="border" onClick={handleEditClick}>
        編集
      </button>
    </div>
  );
}
