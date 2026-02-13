import { useRef, useState } from 'react';
import {
  buildBgmOptions,
  parseSelectValue,
  toSelectValue,
} from '@/features/studio/channels/utils/bgmSelect';
import { useUpdateEpisodeBgm } from '@/features/studio/episodes/hooks/useUpdateEpisodeBgm';
import { useUploadBgm } from '@/features/studio/episodes/hooks/useUploadBgm';
import { useGetMeBgms } from '@/libs/api/generated/me/me';
import type {
  ResponseBgmWithEpisodesResponse,
  ResponseEpisodeResponseBgm,
} from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

interface SaveOptions {
  onSuccess?: () => void;
}

/**
 * EpisodeBgmModal のデータ取得と状態管理を提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @param currentBgm - 現在のBGM
 * @returns BGMオプション、選択状態、操作関数
 */
export function useEpisodeBgmModal(
  channelId: string,
  episodeId: string,
  currentBgm?: ResponseEpisodeResponseBgm,
) {
  const { data: bgmsData, isLoading: isBgmLoading } = useGetMeBgms({
    include_system: true,
  });
  const allBgms = unwrapResponse<ResponseBgmWithEpisodesResponse[]>(
    bgmsData,
    [],
  );
  const bgmOptions = buildBgmOptions(allBgms);

  const { isUpdating, error, setEpisodeBgm, removeEpisodeBgm } =
    useUpdateEpisodeBgm(channelId, episodeId);
  const { uploadBgm, isUploading, error: uploadError } = useUploadBgm();

  const bgmFileInputRef = useRef<HTMLInputElement>(null);
  const [selectedValue, setSelectedValue] = useState(toSelectValue(currentBgm));
  const [bgmName, setBgmName] = useState('');

  const hasChanged = selectedValue !== toSelectValue(currentBgm);

  /**
   * BGM を選択する
   *
   * @param value - Select の値
   */
  function select(value: string) {
    setSelectedValue(value);
  }

  /**
   * BGM の選択を解除する
   */
  function clearSelection() {
    setSelectedValue('');
  }

  /**
   * BGM名を更新する
   *
   * @param name - BGM名
   */
  function updateBgmName(name: string) {
    setBgmName(name);
  }

  /**
   * 選択した BGM を保存する
   *
   * 値が未選択の場合はBGMを解除する。
   *
   * @param options - オプション（成功時コールバック）
   */
  function save(options?: SaveOptions) {
    if (!selectedValue) {
      removeEpisodeBgm(options);
      return;
    }

    const parsed = parseSelectValue(selectedValue);
    if (!parsed) return;

    setEpisodeBgm(
      parsed.type === 'user' ? parsed.id : undefined,
      parsed.type === 'system' ? parsed.id : undefined,
      options,
    );
  }

  /**
   * BGM ファイルをアップロードする
   *
   * @param file - アップロードする音声ファイル
   */
  function upload(file: File) {
    uploadBgm(file, bgmName);
    setBgmName('');
    resetFileInput();
  }

  /**
   * ファイル選択ダイアログを開く
   */
  function openFilePicker() {
    bgmFileInputRef.current?.click();
  }

  /**
   * ファイル入力をリセットする
   */
  function resetFileInput() {
    if (bgmFileInputRef.current) {
      bgmFileInputRef.current.value = '';
    }
  }

  return {
    bgmOptions,
    selectedValue,
    bgmName,
    hasChanged,
    isBgmLoading,
    isUpdating,
    isUploading,
    error,
    uploadError,
    bgmFileInputRef,

    select,
    clearSelection,
    updateBgmName,
    save,
    upload,
    openFilePicker,
  };
}
