import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { Dialog } from '@/components/utils/Dialog/Dialog';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'utils/Dialog',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>ダイアログを開く</Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Close />
        <Dialog.Title>タイトル</Dialog.Title>
        <Dialog.Description>
          これは汎用ダイアログの基本的な使用例です。
        </Dialog.Description>

        <Dialog.Footer>
          <Dialog.Close>
            <Button variant="outline" color="secondary">
              キャンセル
            </Button>
          </Dialog.Close>
          <Button>確認</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" gap={16}>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="outline" color="secondary">
            Small
          </Button>
        </Dialog.Trigger>
        <Dialog.Content size="sm">
          <Dialog.Close />
          <Dialog.Title>Small Dialog</Dialog.Title>
          <Dialog.Description>max-w-sm のダイアログです。</Dialog.Description>
        </Dialog.Content>
      </Dialog.Root>

      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="outline" color="secondary">
            Medium
          </Button>
        </Dialog.Trigger>
        <Dialog.Content size="md">
          <Dialog.Close />
          <Dialog.Title>Medium Dialog</Dialog.Title>
          <Dialog.Description>max-w-md のダイアログです。</Dialog.Description>
        </Dialog.Content>
      </Dialog.Root>

      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="outline" color="secondary">
            Large
          </Button>
        </Dialog.Trigger>
        <Dialog.Content size="lg">
          <Dialog.Close />
          <Dialog.Title>Large Dialog</Dialog.Title>
          <Dialog.Description>max-w-lg のダイアログです。</Dialog.Description>
        </Dialog.Content>
      </Dialog.Root>
    </Stack>
  ),
};

function ControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>外部から開く</Button>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Content>
          <Dialog.Close />
          <Dialog.Title>Controlled Dialog</Dialog.Title>
          <Dialog.Description>
            外部の状態で開閉を制御しています。
          </Dialog.Description>

          <Dialog.Footer>
            <Button
              variant="outline"
              color="secondary"
              onClick={() => setOpen(false)}
            >
              閉じる
            </Button>
            <Button onClick={() => setOpen(false)}>確認</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}

export const Controlled: Story = {
  render: () => (
    <Section title="Controlled">
      <ControlledExample />
    </Section>
  ),
};
