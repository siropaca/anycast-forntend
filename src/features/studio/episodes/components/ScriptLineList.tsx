'use client';

import { useRef } from 'react';
import { ScriptGenerateForm } from '@/features/studio/episodes/components/ScriptGenerateForm';
import { ScriptLineItem } from '@/features/studio/episodes/components/ScriptLineItem';
import { useExportScript } from '@/features/studio/episodes/hooks/useExportScript';
import { useImportScript } from '@/features/studio/episodes/hooks/useImportScript';
import { useScriptLines } from '@/features/studio/episodes/hooks/useScriptLines';
import { useSequentialPlayback } from '@/features/studio/episodes/hooks/useSequentialPlayback';

interface Props {
  channelId: string;
  episodeId: string;
  episodeName: string;
}

export function ScriptLineList({ channelId, episodeId, episodeName }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { scriptLines } = useScriptLines(channelId, episodeId);
  const {
    isSequentialEnabled,
    toggleSequential,
    startPlayback,
    stopPlayback,
    handleEnded,
    isPlaying,
  } = useSequentialPlayback(scriptLines);
  const {
    exportScript,
    isExporting,
    error: exportError,
  } = useExportScript(channelId, episodeId, episodeName);
  const {
    handleFileSelect,
    isImporting,
    error: importError,
  } = useImportScript(channelId, episodeId);

  function handleExportClick() {
    exportScript();
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  if (scriptLines.length === 0) {
    return <ScriptGenerateForm channelId={channelId} episodeId={episodeId} />;
  }

  return (
    <>
      {exportError && <p>{exportError}</p>}
      {importError && <p>{importError}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept=".txt"
        className="hidden"
        onChange={handleFileSelect}
      />

      <label className="flex items-center gap-1">
        <input
          type="checkbox"
          checked={isSequentialEnabled}
          onChange={toggleSequential}
        />
        連続再生
      </label>

      <button type="button" className="border">
        全体の音声を生成
      </button>

      <button type="button" className="border">
        BGMを追加
      </button>

      <button
        type="button"
        className="border"
        disabled={isImporting}
        onClick={handleImportClick}
      >
        {isImporting ? 'インポート中...' : '台本をインポート'}
      </button>

      <button
        type="button"
        className="border"
        disabled={isExporting}
        onClick={handleExportClick}
      >
        {isExporting ? 'エクスポート中...' : '台本をエクスポート'}
      </button>

      <ul className="space-y-2 mt-4">
        {scriptLines.map((line) => (
          <ScriptLineItem
            key={line.id}
            channelId={channelId}
            episodeId={episodeId}
            line={line}
            isPlaying={isPlaying(line.id)}
            onPlay={() => startPlayback(line.id)}
            onPause={stopPlayback}
            onEnded={() => handleEnded(line.id)}
          />
        ))}
      </ul>
    </>
  );
}
