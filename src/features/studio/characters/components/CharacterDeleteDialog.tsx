'use client';

import { ConfirmDialog } from '@/components/utils/Dialog/ConfirmDialog';

interface Props {
  characterName?: string;
  open: boolean;
  error?: string;

  onClose: () => void;
  onConfirm: () => void;
}

export function CharacterDeleteDialog({
  characterName,
  open,
  error,
  onClose,
  onConfirm,
}: Props) {
  return (
    <ConfirmDialog
      trigger={<span className="hidden" />}
      open={open}
      title="キャラクターを削除"
      description={
        <>
          「{characterName}」を削除しますか？
          <br />
          この操作は取り消せません。
        </>
      }
      error={error}
      confirmLabel="削除"
      confirmColor="danger"
      onOpenChange={(isOpen) => !isOpen && onClose()}
      onConfirm={onConfirm}
    />
  );
}
