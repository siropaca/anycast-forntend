'use client';

import { ClampText } from '@/components/dataDisplay/ClampText/ClampText';

interface Props {
  description: string | undefined;
}

export function EpisodeDescription({ description }: Props) {
  if (!description) {
    return (
      <section>
        <h2 className="mb-3 text-lg font-bold">説明</h2>
        <p className="text-sm text-text-subtle">説明はありません</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-3 text-lg font-bold">説明</h2>
      <ClampText className="text-sm text-text-subtle">{description}</ClampText>
    </section>
  );
}
