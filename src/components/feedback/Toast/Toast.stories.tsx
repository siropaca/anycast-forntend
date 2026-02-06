import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { ToastProvider } from '@/components/feedback/Toast/ToastProvider';
import { useToast } from '@/hooks/useToast';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'feedback/Toast',
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function SuccessExample() {
  const toast = useToast();

  return (
    <Button onClick={() => toast.success({ title: '保存しました' })}>
      成功トーストを表示
    </Button>
  );
}

function ErrorExample() {
  const toast = useToast();

  return (
    <Button
      onClick={() =>
        toast.error({
          title: 'エラーが発生しました',
          description: '再度お試しください。',
        })
      }
    >
      エラートーストを表示
    </Button>
  );
}

function WithDescriptionExample() {
  const toast = useToast();

  return (
    <Button
      variant="outline"
      color="secondary"
      onClick={() =>
        toast.success({
          title: '設定を保存しました',
          description: '変更内容は即座に反映されます。',
        })
      }
    >
      説明付きトーストを表示
    </Button>
  );
}

export const Success: Story = {
  render: () => (
    <Section title="Success">
      <SuccessExample />
    </Section>
  ),
};

export const Error: Story = {
  render: () => (
    <Section title="Error">
      <ErrorExample />
    </Section>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Section title="With Description">
      <WithDescriptionExample />
    </Section>
  ),
};

function AllVariantsExample() {
  const toast = useToast();

  return (
    <Stack direction="row" gap={12}>
      <Button onClick={() => toast.success({ title: '保存しました' })}>
        Success
      </Button>
      <Button
        onClick={() =>
          toast.error({
            title: 'エラーが発生しました',
            description: '再度お試しください。',
          })
        }
      >
        Error
      </Button>
      <Button
        variant="outline"
        color="secondary"
        onClick={() =>
          toast.success({
            title: '設定を保存しました',
            description: '変更内容は即座に反映されます。',
          })
        }
      >
        With Description
      </Button>
    </Stack>
  );
}

export const AllVariants: Story = {
  render: () => (
    <Section title="All Variants">
      <AllVariantsExample />
    </Section>
  ),
};
