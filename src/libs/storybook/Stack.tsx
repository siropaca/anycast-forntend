import type { CSSProperties, ReactNode } from 'react';

interface Props {
  direction?: 'row' | 'column';
  align?: CSSProperties['alignItems'];
  gap?: number;
  children: ReactNode;
}

export function Stack({
  direction = 'row',
  align = 'center',
  gap = 16,
  children,
}: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction,
        gap: `${gap}px`,
        alignItems: align,
        flexWrap: 'wrap',
      }}
    >
      {children}
    </div>
  );
}
