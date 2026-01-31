import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';
import { cn } from '@/utils/cn';

interface Props {
  size?: number;
  rounded?: boolean;
  className?: string;
}

export function ArtworkImageSkeleton({ size, rounded, className }: Props) {
  return (
    <Skeleton
      style={size ? { width: size, height: size } : undefined}
      className={cn(
        'shrink-0',
        rounded ? 'rounded-full' : '',
        !size && 'aspect-square w-full',
        className,
      )}
    />
  );
}
