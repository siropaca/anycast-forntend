'use client';

import { useState } from 'react';
import { useDeleteScriptLine } from '@/features/studio/episodes/hooks/useDeleteScriptLine';
import { useUpdateScriptLine } from '@/features/studio/episodes/hooks/useUpdateScriptLine';
import type { ResponseScriptLineResponse } from '@/libs/api/generated/schemas';

interface Props {
  channelId: string;
  episodeId: string;
  line: ResponseScriptLineResponse;
}

export function ScriptLineItem({ channelId, episodeId, line }: Props) {
  const [emotion, setEmotion] = useState(line.emotion);
  const [text, setText] = useState(line.text);

  const {
    updateLine,
    isUpdating,
    error: updateError,
  } = useUpdateScriptLine(channelId, episodeId);

  const {
    deleteLine,
    isDeleting,
    error: deleteError,
  } = useDeleteScriptLine(channelId, episodeId);

  const hasChanges = emotion !== line.emotion || text !== line.text;

  function handleUpdate() {
    updateLine(line.id, { emotion, text });
  }

  function handleDelete() {
    deleteLine(line.id);
  }

  const error = updateError ?? deleteError;

  return (
    <li>
      <div>
        {line.speaker.name} ({line.speaker.voice.name}):
      </div>

      <div className="flex">
        <input
          value={emotion}
          onChange={(e) => setEmotion(e.target.value)}
          placeholder="感情を入力"
          className="border"
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="台本を入力"
          className="border grow"
        />
      </div>

      <div>
        <button
          type="button"
          className="border"
          disabled={isUpdating || !hasChanges}
          onClick={handleUpdate}
        >
          {isUpdating ? '更新中...' : '更新'}
        </button>
        <button
          type="button"
          className="border"
          disabled={isDeleting}
          onClick={handleDelete}
        >
          {isDeleting ? '削除中...' : '削除'}
        </button>
      </div>

      {error && <p>{error}</p>}
    </li>
  );
}
