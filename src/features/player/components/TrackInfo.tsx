import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import { cn } from '@/utils/cn';

interface Props {
  title: string;
  artworkUrl?: string;
  subtitle?: string;
  artworkSize?: number;
  className?: string;
}

export function TrackInfo({
  title,
  artworkUrl,
  subtitle,
  artworkSize = 56,
  className,
}: Props) {
  return (
    <div className={cn('flex items-center gap-3 min-w-0', className)}>
      <ArtworkImage src={artworkUrl} alt={title} size={artworkSize} />
      <div className="min-w-0">
        <p className="text-sm text-text-main truncate">{title}</p>
        {subtitle && (
          <p className="text-xs text-text-subtle truncate">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
