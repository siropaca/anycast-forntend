'use client';

import { PauseIcon, PlayIcon } from '@phosphor-icons/react';
import { DataTable } from '@/components/dataDisplay/DataTable/DataTable';
import { useVoiceList } from '@/features/studio/voices/hooks/useVoiceList';
import { useVoicePlayer } from '@/features/studio/voices/hooks/useVoicePlayer';
import {
  getGenderLabel,
  getProviderLabel,
} from '@/features/studio/voices/utils/voiceLabels';
import type { ResponseVoiceResponse } from '@/libs/api/generated/schemas';

export function VoiceList() {
  const { voices } = useVoiceList();
  const { isVoicePlaying, playVoice, pauseVoice } = useVoicePlayer();

  function handlePlayClick(
    e: React.MouseEvent<HTMLButtonElement>,
    voice: ResponseVoiceResponse,
  ) {
    e.stopPropagation();

    if (isVoicePlaying(voice)) {
      pauseVoice();
    } else {
      playVoice(voice, voices);
    }
  }

  const columns = [
    {
      key: 'name',
      header: 'ボイス名',
      accessor: (voice: ResponseVoiceResponse) => <span>{voice.name}</span>,
    },
    {
      key: 'gender',
      header: '性別',
      accessor: (voice: ResponseVoiceResponse) => (
        <span>{getGenderLabel(voice.gender)}</span>
      ),
    },
    {
      key: 'provider',
      header: 'プロバイダー',
      accessor: (voice: ResponseVoiceResponse) => (
        <span>{getProviderLabel(voice.provider)}</span>
      ),
    },
    {
      key: 'play',
      header: '',
      className: 'px-4 py-3 text-right',
      accessor: (voice: ResponseVoiceResponse) => (
        <button
          type="button"
          aria-label={isVoicePlaying(voice) ? '一時停止' : '再生'}
          className="inline-flex size-8 items-center justify-center rounded-full bg-secondary text-bg-main transition-transform hover:scale-105 cursor-pointer"
          onClick={(e) => handlePlayClick(e, voice)}
        >
          {isVoicePlaying(voice) ? (
            <PauseIcon size={16} weight="fill" />
          ) : (
            <PlayIcon size={16} weight="fill" />
          )}
        </button>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={voices}
      emptyMessage="ボイスがありません"
      keyExtractor={(voice) => voice.id}
    />
  );
}
