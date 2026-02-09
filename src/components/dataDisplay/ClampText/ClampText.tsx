'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';

interface Props {
  children: string;
  lines?: number;
  className?: string;
}

const lineClampClasses: Record<number, string> = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
};

export function ClampText({ children, lines = 3, className }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: children の変化で ref の高さが変わるため必要
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    setIsClamped(el.scrollHeight > el.clientHeight);
  }, [children]);

  function handleToggle() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div>
      <p
        ref={textRef}
        className={cn(
          'whitespace-pre-wrap',
          !isExpanded && lineClampClasses[lines],
          className,
        )}
      >
        {children}
      </p>
      {!isExpanded && isClamped && (
        <button
          type="button"
          className="mt-1 cursor-pointer text-sm text-text-subtle hover:underline"
          onClick={handleToggle}
        >
          ...さらに表示
        </button>
      )}
    </div>
  );
}
