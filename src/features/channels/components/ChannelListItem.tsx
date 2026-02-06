import Link from 'next/link';

import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import type { ResponsePublicUserChannelResponse } from '@/libs/api/generated/schemas/responsePublicUserChannelResponse';
import { Pages } from '@/libs/pages';

interface Props {
  channel: ResponsePublicUserChannelResponse;
}

export function ChannelListItem({ channel }: Props) {
  return (
    <div className="flex gap-6 border-b border-border py-4 last:border-b-0 mt-2">
      <Link
        href={Pages.channel.path({ channelId: channel.id })}
        className="shrink-0"
      >
        <ArtworkImage
          src={channel.artwork?.url}
          alt={channel.name}
          size={120}
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <Link
          href={Pages.channel.path({ channelId: channel.id })}
          className="mb-1 inline-block hover:underline font-semibold leading-snug text-lg"
        >
          {channel.name}
        </Link>

        <p className="mb-2 text-sm text-text-subtle">
          <Link
            href={Pages.exploreCategory.path({
              category: channel.category.slug,
            })}
            className="hover:underline"
          >
            {channel.category.name}
          </Link>
          <span className="mx-1">·</span>
          {channel.episodeCount}エピソード
        </p>

        {channel.description && (
          <p className="line-clamp-3 text-sm text-text-subtle">
            {channel.description}
          </p>
        )}
      </div>
    </div>
  );
}
