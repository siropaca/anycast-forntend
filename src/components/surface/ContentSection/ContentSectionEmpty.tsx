import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  message: string;
}

export function ContentSectionEmpty({ children, message }: Props) {
  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none opacity-30 **:animate-none!"
        aria-hidden="true"
      >
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-sm text-text-subtle">{message}</p>
      </div>
    </div>
  );
}
