'use client';

import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import type { ResponseEpisodeResponseBgm } from '@/libs/api/generated/schemas';

interface Props {
  bgm?: ResponseEpisodeResponseBgm;
}

export function BgmSection({ bgm }: Props) {
  return (
    <div className="space-y-4">
      <SectionTitle title="BGM" level="h3" />
      <p className="text-sm text-text-subtle">{bgm ? bgm.name : '未設定'}</p>
    </div>
  );
}
