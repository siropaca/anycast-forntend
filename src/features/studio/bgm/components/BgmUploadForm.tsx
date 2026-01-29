'use client';

import { useRef, useState } from 'react';
import { useUploadBgm } from '@/features/studio/episodes/hooks/useUploadBgm';

export function BgmUploadForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [bgmName, setBgmName] = useState('');

  const { uploadBgm, isUploading, error: uploadError } = useUploadBgm();

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    uploadBgm(file, bgmName);
    setBgmName('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  return (
    <div>
      <div className="mb-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <input
          type="text"
          placeholder="BGM名（省略時はファイル名）"
          className="border mr-2"
          value={bgmName}
          disabled={isUploading}
          onChange={(e) => setBgmName(e.target.value)}
        />
        <button
          type="button"
          className="border"
          disabled={isUploading}
          onClick={handleUploadClick}
        >
          {isUploading ? 'アップロード中...' : 'BGMをアップロード'}
        </button>
      </div>

      {uploadError && <p>{uploadError}</p>}
    </div>
  );
}
