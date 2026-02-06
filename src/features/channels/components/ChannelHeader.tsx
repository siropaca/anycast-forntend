import Link from 'next/link';

import { Avatar } from '@/components/dataDisplay/Avatar/Avatar';
import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import type { ResponseChannelResponse } from '@/libs/api/generated/schemas/responseChannelResponse';
import { Pages } from '@/libs/pages';

const ARTWORK_SIZE = 170;

interface Props {
  channel: ResponseChannelResponse;
}

export function ChannelHeader({ channel }: Props) {
  const episodeCount = channel.episodes.length;

  return (
    <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
      <ArtworkImage
        src={channel.artwork?.url}
        alt={channel.name}
        size={ARTWORK_SIZE}
        priority
      />

      <div className="flex flex-col items-center gap-2.5 md:items-start">
        <h1 className="text-2xl font-bold">{channel.name}</h1>

        <p className="text-text-subtle">
          <Link
            href={Pages.exploreCategory.path({
              category: channel.category.slug,
            })}
            className="hover:underline"
          >
            {channel.category.name}
          </Link>
        </p>

        <Link
          href={Pages.user.path({
            username: channel.owner.username,
          })}
          className="flex items-center gap-2 text-sm text-text-subtle hover:underline"
        >
          <Avatar
            src={channel.owner.avatar?.url}
            alt={channel.owner.displayName}
            fallback={channel.owner.displayName.charAt(0)}
            size="sm"
          />
          {channel.owner.displayName}
        </Link>

        <p className="text-sm text-text-subtle">{episodeCount}エピソード</p>
      </div>
    </div>
  );
}
