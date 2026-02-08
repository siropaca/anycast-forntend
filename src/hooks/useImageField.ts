import { useRef, useState } from 'react';

import { useUploadArtwork } from '@/hooks/useUploadArtwork';

interface ImageFieldCallbacks {
  onUpload: (id: string) => void;
  onRemove: () => void;
}

/**
 * 画像フィールドのプレビュー・アップロード・削除ロジックを提供する
 *
 * @param callbacks - アップロード成功時・削除時のコールバック
 * @returns 画像フィールドの状態と操作関数
 */
export function useImageField(callbacks: ImageFieldCallbacks) {
  const { uploadArtwork, isUploading, error } = useUploadArtwork();

  const [previewUrl, setPreviewUrl] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * ファイル選択ダイアログを開く
   */
  function openFilePicker() {
    fileInputRef.current?.click();
  }

  /**
   * ファイルをアップロードしてプレビューを更新する
   *
   * @param file - アップロードする画像ファイル
   */
  function upload(file: File) {
    uploadArtwork(file, ({ id, url }) => {
      callbacks.onUpload(id);
      setPreviewUrl(url);
    });
  }

  /**
   * プレビューとファイル入力をクリアし、onRemove を呼び出す
   */
  function remove() {
    callbacks.onRemove();
    setPreviewUrl(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  /**
   * プレビュー URL を外部から設定する（フォーム初期化用）
   *
   * @param url - 設定するプレビュー URL
   */
  function resetPreview(url: string | undefined) {
    setPreviewUrl(url);
  }

  return {
    previewUrl,
    fileInputRef,
    isUploading,
    error,

    openFilePicker,
    upload,
    remove,
    resetPreview,
  };
}
