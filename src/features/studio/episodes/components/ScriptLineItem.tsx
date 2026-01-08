'use client';

import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import { useDeleteScriptLine } from '@/features/studio/episodes/hooks/useDeleteScriptLine';
import { useGenerateLineAudio } from '@/features/studio/episodes/hooks/useGenerateLineAudio';
import type { ResponseScriptLineResponse } from '@/libs/api/generated/schemas';

interface Props {
  channelId: string;
  episodeId: string;
  line: ResponseScriptLineResponse;
}

export function ScriptLineItem({ channelId, episodeId, line }: Props) {
  const { generateAudioMutation } = useGenerateLineAudio(channelId, episodeId);
  const { deleteLineMutation } = useDeleteScriptLine(channelId, episodeId);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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

  function handleDelete() {
    setError(undefined);
    setIsDeleting(true);

    deleteLineMutation.mutate(
      {
        channelId,
        episodeId,
        lineId: line.id,
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.NO_CONTENT) {
            setError(response.data.error.message);
          }
        },
        onSettled: () => {
          setIsDeleting(false);
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
      {line.audio && (
        <audio controls preload="metadata">
          <source src={line.audio.url} type={line.audio.mimeType} />
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
      <button
        type="button"
        className="border"
        disabled={isDeleting}
        onClick={handleDelete}
      >
        {isDeleting ? '削除中...' : '削除'}
      </button>
      {error && <p>{error}</p>}
    </li>
  );
}
