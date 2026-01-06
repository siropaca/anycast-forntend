'use client';

import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import { useGenerateLineAudio } from '@/features/studio/episodes/hooks/useGenerateLineAudio';
import type { ResponseScriptLineResponse } from '@/libs/api/generated/schemas';

interface Props {
  channelId: string;
  episodeId: string;
  line: ResponseScriptLineResponse;
}

export function ScriptLineItem({ channelId, episodeId, line }: Props) {
  const { generateAudioMutation } = useGenerateLineAudio(channelId, episodeId);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>();

  function handleGenerateAudio() {
    setError(undefined);
    setIsGenerating(true);

    generateAudioMutation.mutate(
      {
        channelId,
        episodeId,
        lineId: line.id,
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(response.data.error.message);
          }
        },
        onSettled: () => {
          setIsGenerating(false);
        },
      },
    );
  }

  return (
    <li>
      <div>{line.speaker?.name}:</div>
      <div>
        {line.emotion && `[${line.emotion}]`} {line.text}
      </div>
      {line.audio?.url && (
        <audio controls preload="metadata">
          <source src={line.audio.url} type="audio/mpeg" />
        </audio>
      )}
      <button
        type="button"
        className="border"
        disabled={isGenerating}
        onClick={handleGenerateAudio}
      >
        {isGenerating ? '生成中...' : '音声を生成'}
      </button>
      {error && <p>{error}</p>}
    </li>
  );
}
