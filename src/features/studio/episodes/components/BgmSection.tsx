'use client';

import { MusicNoteIcon } from '@phosphor-icons/react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { BgmPlayButton } from '@/features/studio/channels/components/BgmPlayButton';
import type { ResponseEpisodeResponseBgm } from '@/libs/api/generated/schemas';

interface Props {
  bgm?: ResponseEpisodeResponseBgm;
}

export function BgmSection({ bgm }: Props) {
  return (
    <div className="space-y-4">
      <SectionTitle title="BGM" level="h3" />
      {bgm ? (
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-bg-elevated text-text-placeholder">
            <MusicNoteIcon size={20} />
          </div>
          <div className="flex items-center gap-1.5">
            <p className="text-sm">{bgm.name}</p>
            <BgmPlayButton bgm={bgm} />
          </div>
        </div>
      ) : (
        <p className="text-sm text-text-placeholder">未設定</p>
      )}
    </div>
  );
}
