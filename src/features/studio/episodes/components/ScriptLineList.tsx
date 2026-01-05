'use client';

import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import { ScriptGenerateForm } from '@/features/studio/episodes/components/ScriptGenerateForm';
import { useGenerateScript } from '@/features/studio/episodes/hooks/useGenerateScript';
import { useScriptLines } from '@/features/studio/episodes/hooks/useScriptLines';
import type { ScriptGenerateFormInput } from '@/features/studio/episodes/schemas/scriptGenerate';

interface Props {
  channelId: string;
  episodeId: string;
}

export function ScriptLineList({ channelId, episodeId }: Props) {
  const { scriptLines } = useScriptLines(channelId, episodeId);
  const { generateMutation, generateAudioMutation } = useGenerateScript(
    channelId,
    episodeId,
  );
  const [error, setError] = useState<string>();
  const [audioError, setAudioError] = useState<string>();
  const [generatingLineId, setGeneratingLineId] = useState<string>();

  function handleSubmit(data: ScriptGenerateFormInput) {
    setError(undefined);

    generateMutation.mutate(
      {
        channelId,
        episodeId,
        data: {
          prompt: data.prompt,
          durationMinutes: data.durationMinutes,
        },
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(response.data.error.message);
          }
        },
      },
    );
  }

  function handleGenerateAudio(lineId: string) {
    setAudioError(undefined);
    setGeneratingLineId(lineId);

    generateAudioMutation.mutate(
      {
        channelId,
        episodeId,
        lineId,
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setAudioError(response.data.error.message);
          }
        },
        onSettled: () => {
          setGeneratingLineId(undefined);
        },
      },
    );
  }

  if (scriptLines.length === 0) {
    return (
      <ScriptGenerateForm
        isSubmitting={generateMutation.isPending}
        error={error}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <>
      <button type="button" className="border">
        全体の音声を生成
      </button>

      <button type="button" className="border">
        台本を出力
      </button>

      <hr className="my-4" />

      <ul className="space-y-2">
        {scriptLines.map((line) => (
          <li key={line.id}>
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
              disabled={generatingLineId === line.id}
              onClick={() => handleGenerateAudio(line.id)}
            >
              {generatingLineId === line.id ? '生成中...' : '音声を生成'}
            </button>
            {audioError && <p>{audioError}</p>}
          </li>
        ))}
      </ul>
    </>
  );
}
