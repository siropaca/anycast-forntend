import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { ConfirmDialog } from '@/components/utils/Dialog/ConfirmDialog';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'utils/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    trigger: <Button>開く</Button>,
    title: '確認',
    description: 'この操作を実行してもよろしいですか？',
  },
};

export const Delete: Story = {
  args: {
    trigger: <Button color="danger">削除する</Button>,
    title: '本当に削除しますか？',
    description: 'この操作は取り消せません。データは完全に削除されます。',
    confirmLabel: '削除',
    confirmColor: 'danger',
  },
};

export const WithLineBreaks: Story = {
  args: {
    trigger: <Button color="danger">削除</Button>,
    title: 'BGMを削除',
    description: (
      <>
        「サンプルBGM」を削除しますか？
        <br />
        この操作は取り消せません。
      </>
    ),
    confirmLabel: '削除',
    confirmColor: 'danger',
  },
};

export const Variants: Story = {
  args: {
    trigger: <Button>デフォルト</Button>,
    title: '確認',
  },
  render: () => (
    <Stack direction="row" gap={16}>
      <ConfirmDialog
        trigger={<Button>デフォルト</Button>}
        title="確認"
        description="実行しますか？"
      />

      <ConfirmDialog
        trigger={<Button color="danger">削除</Button>}
        title="削除しますか？"
        description="この操作は取り消せません。"
        confirmLabel="削除"
        confirmColor="danger"
      />

      <ConfirmDialog
        trigger={
          <Button variant="outline" color="secondary">
            ログアウト
          </Button>
        }
        title="ログアウトしますか？"
        confirmLabel="ログアウト"
      />
    </Stack>
  ),
};
