import { cn } from '@/utils/cn';

const MAX_COUNT = 99;

type Size = 'sm' | 'md' | 'lg';

const sizeClasses: Record<Size, string> = {
  sm: 'h-3 min-w-3 px-0.5 text-[8px]',
  md: 'h-4 min-w-4 px-1 text-[10px]',
  lg: 'h-5 min-w-5 px-1.5 text-xs',
};

interface Props {
  count: number;
  size?: Size;
  className?: string;
}

/**
 * 数値バッジ
 *
 * @param count - 表示するカウント（99 を超える場合は「99+」表示）
 * @param size - バッジのサイズ
 * @param className - 追加の CSS クラス
 */
export function Badge({ count, size = 'md', className }: Props) {
  if (count <= 0) return null;

  return (
    <span
      className={cn(
        'pointer-events-none flex items-center justify-center rounded-full bg-badge font-semibold text-white',
        sizeClasses[size],
        className,
      )}
    >
      {count > MAX_COUNT ? '99+' : count}
    </span>
  );
}
