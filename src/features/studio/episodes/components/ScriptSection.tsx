'use client';

import { DownloadSimpleIcon, UploadSimpleIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { ScriptImportModal } from '@/features/studio/episodes/components/ScriptImportModal';
import { ScriptLineList } from '@/features/studio/episodes/components/ScriptLineList';
import { useExportScript } from '@/features/studio/episodes/hooks/useExportScript';
import { useScriptLines } from '@/features/studio/episodes/hooks/useScriptLines';

interface Props {
  channelId: string;
  episodeId: string;
  episodeName: string;
  onGenerateClick?: () => void;
}

export function ScriptSection({
  channelId,
  episodeId,
  episodeName,
  onGenerateClick,
}: Props) {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const { scriptLines } = useScriptLines(channelId, episodeId);

  const {
    exportScript,
    isExporting,
    error: exportError,
  } = useExportScript(channelId, episodeId, episodeName);

  function handleImportClick() {
    setIsImportModalOpen(true);
  }

  return (
    <div className="space-y-4">
      <SectionTitle
        title={`台本（${scriptLines.length}行）`}
        level="h3"
        action={
          <div className="flex items-center gap-3">
            <Button
              leftIcon={<DownloadSimpleIcon size={14} />}
              variant="outline"
              color="secondary"
              size="sm"
              onClick={handleImportClick}
            >
              インポート
            </Button>

            <Button
              leftIcon={<UploadSimpleIcon size={14} />}
              variant="outline"
              color="secondary"
              size="sm"
              disabled={isExporting || scriptLines.length === 0}
              onClick={exportScript}
            >
              エクスポート
            </Button>
          </div>
        }
      />

      {exportError && (
        <p className="whitespace-pre-line text-sm text-text-danger">
          {exportError}
        </p>
      )}

      <ScriptLineList
        channelId={channelId}
        episodeId={episodeId}
        onGenerateClick={onGenerateClick}
        onImportClick={handleImportClick}
      />

      <ScriptImportModal
        open={isImportModalOpen}
        channelId={channelId}
        episodeId={episodeId}
        onClose={() => setIsImportModalOpen(false)}
      />
    </div>
  );
}
