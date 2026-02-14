'use client';

import { MusicNoteIcon, PencilSimpleIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { BgmPlayButton } from '@/features/studio/channels/components/BgmPlayButton';
import { EpisodeBgmModal } from '@/features/studio/episodes/components/EpisodeBgmModal';
import type { ResponseEpisodeResponseBgm } from '@/libs/api/generated/schemas';

interface Props {
  channelId: string;
  episodeId: string;
  bgm?: ResponseEpisodeResponseBgm;
}

export function BgmSection({ channelId, episodeId, bgm }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-3">
      <SectionTitle
        title="BGM"
        level="h3"
        action={
          <Button
            size="sm"
            variant="outline"
            color="secondary"
            leftIcon={<PencilSimpleIcon size={16} />}
            onClick={() => setModalOpen(true)}
          >
            編集
          </Button>
        }
      />

      {bgm ? (
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-bg-elevated text-text-placeholder">
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

      {modalOpen && (
        <EpisodeBgmModal
          channelId={channelId}
          episodeId={episodeId}
          currentBgm={bgm}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      )}
    </div>
  );
}
