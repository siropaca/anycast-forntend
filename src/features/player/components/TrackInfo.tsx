import { MusicNotesIcon, UserIcon } from '@phosphor-icons/react';
import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import type { Track } from '@/stores/playerStore';
import { cn } from '@/utils/cn';

interface Props {
  title: string;
  artworkUrl?: string;
  trackType?: Track['type'];
  subtitle?: string;
  artworkSize?: number;
  className?: string;
}

export function TrackInfo({
  title,
  artworkUrl,
  trackType,
  subtitle,
  artworkSize = 56,
  className,
}: Props) {
  return (
    <div className={cn('flex items-center gap-3 min-w-0', className)}>
      {trackType === 'voiceSample' ? (
        <div
          style={{ width: artworkSize, height: artworkSize }}
          className="flex shrink-0 items-center justify-center rounded-full bg-bg-elevated text-text-placeholder"
        >
          <UserIcon size={artworkSize * 0.45} />
        </div>
      ) : (
        <div className="relative">
          <ArtworkImage src={artworkUrl} alt={title} size={artworkSize} />
          {!artworkUrl && (
            <MusicNotesIcon
              size={artworkSize * 0.45}
              className="absolute inset-0 m-auto text-white"
            />
          )}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-sm text-text-main truncate">{title}</p>
        {subtitle && (
          <p className="text-xs text-text-subtle truncate">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
