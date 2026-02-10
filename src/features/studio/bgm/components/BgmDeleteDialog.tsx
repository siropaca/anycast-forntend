'use client';

import { ConfirmDialog } from '@/components/utils/Dialog/ConfirmDialog';

interface Props {
  bgmName?: string;
  open: boolean;
  error?: string;

  onClose: () => void;
  onConfirm: () => void;
}

export function BgmDeleteDialog({
  bgmName,
  open,
  error,
  onClose,
  onConfirm,
}: Props) {
  return (
    <ConfirmDialog
      trigger={<span className="hidden" />}
      open={open}
      title="BGMを削除"
      description={
        <>
          「{bgmName}」を削除しますか？
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
