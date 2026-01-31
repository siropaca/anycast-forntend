import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';
import { cn } from '@/utils/cn';

interface Props {
  size?: number;
  rounded?: boolean;
  className?: string;
}

export function ArtworkImageSkeleton({
  size = 128,
  rounded,
  className,
}: Props) {
  return (
    <Skeleton
      style={{ width: size, height: size }}
      className={cn('shrink-0', rounded ? 'rounded-full' : '', className)}
    />
  );
}
