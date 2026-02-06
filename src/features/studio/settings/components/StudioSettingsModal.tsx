'use client';

import { useForm } from 'react-hook-form';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import { Modal } from '@/components/utils/Modal/Modal';
import { useUpdateUserPrompt } from '@/features/studio/settings/hooks/useUpdateUserPrompt';
import { useDiscardGuard } from '@/hooks/useDiscardGuard';

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;
}

interface FormInput {
  userPrompt: string;
}

export function StudioSettingsModal({ open, onOpenChange }: Props) {
  const { currentUserPrompt, isLoading, isUpdating, error, updateUserPrompt } =
    useUpdateUserPrompt();

  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormInput>({
    values: {
      userPrompt: currentUserPrompt,
    },
  });

  const guardedOnOpenChange = useDiscardGuard(onOpenChange, isDirty);

  function onSubmit() {
    handleSubmit((data) => {
      updateUserPrompt(data.userPrompt, {
        onSuccess: () => onOpenChange(false),
      });
    })();
  }

  return (
    <Modal.Root open={open} onOpenChange={guardedOnOpenChange}>
      <Modal.Content size="lg">
        <Modal.Header>
          <Modal.Title>スタジオ設定</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body>
          {isLoading ? (
            <p>読み込み中...</p>
          ) : (
            <div className="space-y-4">
              <FormLabel htmlFor="userPrompt">共通のプロンプト</FormLabel>
              <Textarea
                id="userPrompt"
                rows={8}
                className="w-full"
                {...register('userPrompt')}
              />
              {error && <p className="text-sm text-text-danger">{error}</p>}
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Modal.Close>
            <Button variant="outline" color="secondary" disabled={isUpdating}>
              キャンセル
            </Button>
          </Modal.Close>
          <Button disabled={!isDirty || isUpdating} onClick={onSubmit}>
            {isUpdating ? '処理中...' : '保存'}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
