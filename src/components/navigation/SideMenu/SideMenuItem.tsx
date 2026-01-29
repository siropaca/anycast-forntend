import Link from 'next/link';
import type { MenuItem } from '@/components/navigation/SideMenu/types';
import { cn } from '@/utils/cn';

const DEFAULT_ICON_SIZE = 24;

interface Props {
  item: MenuItem;
}

export function SideMenuItem({ item }: Props) {
  const className = cn(
    'px-3 py-2.5 flex gap-x-4 items-center transition-colors rounded-md cursor-pointer text-sm w-full',
    item.isActive ? 'bg-bg-elevated' : 'hover:bg-bg-surface',
  );

  const content = (
    <>
      <item.icon size={item.iconSize ?? DEFAULT_ICON_SIZE} />
      {item.label}
    </>
  );

  if ('href' in item && item.href) {
    return (
      <Link href={item.href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={item.onClick} className={className}>
      {content}
    </button>
  );
}
