import { useRef, useState } from 'react';
import { useUploadBgm } from '@/features/studio/episodes/hooks/useUploadBgm';

/**
 * BGM アップロードモーダルの状態を管理するフック
 *
 * @returns モーダルの状態とフォームの値
 */
export function useBgmUploadModal() {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [bgmName, setBgmName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { uploadBgm, isUploading, error: uploadError } = useUploadBgm();

  function reset() {
    setBgmName('');
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function selectFile(file: File) {
    setSelectedFile(file);
  }

  function submit() {
    if (!selectedFile) return;
    uploadBgm(selectedFile, bgmName);
    setOpen(false);
  }

  const isDirty = selectedFile !== null || bgmName !== '';

  return {
    open,
    setOpen,
    fileInputRef,
    bgmName,
    setBgmName,
    selectedFile,
    isUploading,
    uploadError,
    isDirty,
    reset,
    openFilePicker,
    selectFile,
    submit,
  };
}
