import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { Input } from '@/components/inputs/Input/Input';
import { FormModal } from '@/components/utils/Modal/FormModal';

const meta = {
  title: 'utils/FormModal',
  component: FormModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <Button>フォームを開く</Button>,
    title: '新規作成',
    children: (
      <div className="space-y-4">
        <div className="space-y-2">
          <FormLabel htmlFor="name">名前</FormLabel>
          <Input id="name" placeholder="名前を入力" />
        </div>
      </div>
    ),
    submitLabel: '作成',
  },
};

export const WithMultipleFields: Story = {
  args: {
    trigger: <Button>編集</Button>,
    title: '情報を編集',
    children: (
      <div className="space-y-4">
        <div className="space-y-2">
          <FormLabel htmlFor="title">タイトル</FormLabel>
          <Input id="title" placeholder="タイトルを入力" />
        </div>
        <div className="space-y-2">
          <FormLabel htmlFor="description">説明</FormLabel>
          <Input id="description" placeholder="説明を入力" />
        </div>
      </div>
    ),
    submitLabel: '保存',
  },
};

export const Submitting: Story = {
  args: {
    trigger: <Button>開く</Button>,
    title: 'アップロード',
    children: <p>ファイルをアップロードしています...</p>,
    submitLabel: 'アップロード',
    isSubmitting: true,
  },
};

export const SubmitDisabled: Story = {
  args: {
    trigger: <Button>開く</Button>,
    title: '新規作成',
    children: (
      <div className="space-y-2">
        <FormLabel htmlFor="required-field" required>
          必須項目
        </FormLabel>
        <Input id="required-field" placeholder="入力してください" />
      </div>
    ),
    submitLabel: '作成',
    submitDisabled: true,
  },
};
