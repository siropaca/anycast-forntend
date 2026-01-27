import { Artwork } from '@/components/dataDisplay/Artwork/Artwork';
import { cn } from '@/utils/cn';

interface Props {
  title: string;
  artworkUrl?: string;
  channelName?: string;
  artworkSize?: number;
  className?: string;
}

export function TrackInfo({
  title,
  artworkUrl,
  channelName,
  artworkSize = 56,
  className,
}: Props) {
  return (
    <div className={cn('flex items-center gap-3 min-w-0', className)}>
      <Artwork src={artworkUrl} alt={title} size={artworkSize} />
      <div className="min-w-0">
        <p className="text-sm text-text-main truncate">{title}</p>
        {channelName && (
          <p className="text-xs text-text-subtle truncate">{channelName}</p>
        )}
      </div>
    </div>
  );
}
