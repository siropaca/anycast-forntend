import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { FormField } from '@/components/inputs/FormField/FormField';
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
        <FormField label="名前">
          {({ id }) => <Input id={id} placeholder="名前を入力" />}
        </FormField>
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
        <FormField label="タイトル">
          {({ id }) => <Input id={id} placeholder="タイトルを入力" />}
        </FormField>
        <FormField label="説明">
          {({ id }) => <Input id={id} placeholder="説明を入力" />}
        </FormField>
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
      <FormField label="必須項目" required>
        {({ id }) => <Input id={id} placeholder="入力してください" />}
      </FormField>
    ),
    submitLabel: '作成',
    submitDisabled: true,
  },
};
