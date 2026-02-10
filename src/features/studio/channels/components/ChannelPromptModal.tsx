'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import { Modal } from '@/components/utils/Modal/Modal';
import { useUpdateChannelPrompt } from '@/features/studio/channels/hooks/useUpdateChannelPrompt';
import {
  type StudioSettingsFormInput,
  studioSettingsFormSchema,
} from '@/features/studio/settings/schemas/studioSettings';
import { useDiscardGuard } from '@/hooks/useDiscardGuard';
import { useToast } from '@/hooks/useToast';

interface Props {
  channelId: string;
  currentUserPrompt: string;
  open: boolean;

  onOpenChange: (open: boolean) => void;
}

export function ChannelPromptModal({
  channelId,
  currentUserPrompt,
  open,
  onOpenChange,
}: Props) {
  const toast = useToast();
  const { isUpdating, error, updatePrompt } = useUpdateChannelPrompt(
    channelId,
    currentUserPrompt,
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty, errors },
  } = useForm<StudioSettingsFormInput>({
    resolver: zodResolver(studioSettingsFormSchema),
    values: {
      userPrompt: currentUserPrompt,
    },
  });

  const guardedOnOpenChange = useDiscardGuard(onOpenChange, isDirty);

  function onSubmit() {
    handleSubmit((data) => {
      updatePrompt(data.userPrompt, {
        onSuccess: () => {
          onOpenChange(false);
          toast.success({ title: '台本プロンプトを保存しました' });
        },
      });
    })();
  }

  return (
    <Modal.Root open={open} onOpenChange={guardedOnOpenChange}>
      <Modal.Content size="lg">
        <Modal.Header>
          <Modal.Title>台本プロンプト</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body>
          <div className="space-y-4">
            <FormLabel
              htmlFor="userPrompt"
              helpText="エピソード生成時に台本プロンプトとして使用されます。"
            >
              台本プロンプト
            </FormLabel>
            <Textarea
              id="userPrompt"
              rows={8}
              className="w-full"
              maxLength={2000}
              showCounter
              error={!!errors.userPrompt}
              value={watch('userPrompt')}
              {...register('userPrompt')}
            />
            {errors.userPrompt && (
              <HelperText error>{errors.userPrompt.message}</HelperText>
            )}
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
            disabled={!isDirty || isUpdating}
            disabledReason={isUpdating ? '保存中...' : '変更がありません'}
            onClick={onSubmit}
          >
            {isUpdating ? '処理中...' : '保存'}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
