'use client';

import { ConfirmDialog } from '@/components/utils/Dialog/ConfirmDialog';

interface Props {
  open: boolean;
  error?: string;

  onClose: () => void;
  onConfirm: () => void;
}

export function PlaybackHistoryDeleteDialog({
  open,
  error,
  onClose,
  onConfirm,
}: Props) {
  return (
    <ConfirmDialog
      trigger={<span className="hidden" />}
      open={open}
      title="再生履歴を削除"
      description={
        <>
          すべての再生履歴を削除しますか？
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
