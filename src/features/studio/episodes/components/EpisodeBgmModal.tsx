'use client';

import { TrashIcon, UploadIcon } from '@phosphor-icons/react';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { Select } from '@/components/inputs/Select/Select';
import { Modal } from '@/components/utils/Modal/Modal';
import { useEpisodeBgmModal } from '@/features/studio/episodes/hooks/useEpisodeBgmModal';
import { useToast } from '@/hooks/useToast';
import type { ResponseEpisodeResponseBgm } from '@/libs/api/generated/schemas';

interface Props {
  channelId: string;
  episodeId: string;
  currentBgm?: ResponseEpisodeResponseBgm;
  open: boolean;

  onOpenChange: (open: boolean) => void;
}

export function EpisodeBgmModal({
  channelId,
  episodeId,
  currentBgm,
  open,
  onOpenChange,
}: Props) {
  const toast = useToast();
  const {
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
  } = useEpisodeBgmModal(channelId, episodeId, currentBgm);

  function handleSave() {
    const message = selectedValue ? 'BGMを設定しました' : 'BGMを解除しました';

    save({
      onSuccess: () => {
        onOpenChange(false);
        toast.success({ title: message });
      },
    });
  }

  function handleBgmFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    upload(file);
  }

  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Content size="lg">
        <Modal.Header>
          <Modal.Title>BGM</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Select
                  name="episodeBgm"
                  options={bgmOptions}
                  value={selectedValue || null}
                  onValueChange={(value) => select(value ?? '')}
                  placeholder="なし"
                  disabled={isBgmLoading}
                />
              </div>
              {selectedValue && (
                <Button
                  type="button"
                  variant="outline"
                  color="danger"
                  size="sm"
                  leftIcon={<TrashIcon size={16} />}
                  onClick={clearSelection}
                >
                  解除
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                ref={bgmFileInputRef}
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleBgmFileChange}
              />
              <Input
                placeholder="BGM名（省略時はファイル名）"
                value={bgmName}
                disabled={isUploading}
                onChange={(e) => updateBgmName(e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                color="secondary"
                loading={isUploading}
                leftIcon={<UploadIcon size={16} />}
                onClick={openFilePicker}
              >
                アップロード
              </Button>
            </div>

            {uploadError && <HelperText error>{uploadError}</HelperText>}
            {error && <HelperText error>{error}</HelperText>}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Modal.Close>
            <Button
              variant="outline"
              color="secondary"
              disabled={isUpdating}
              disabledReason="保存中はキャンセルできません"
            >
              キャンセル
            </Button>
          </Modal.Close>

          <Button
            disabled={!hasChanged || isUpdating}
            disabledReason={isUpdating ? '保存中...' : '変更がありません'}
            onClick={handleSave}
          >
            {isUpdating ? '処理中...' : '保存'}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
