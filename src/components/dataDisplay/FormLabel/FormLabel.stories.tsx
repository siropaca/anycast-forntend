import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'dataDisplay/FormLabel',
  component: FormLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: 'ラベル',
    required: false,
  },
};

export const Default: Story = {
  render: () => (
    <Stack direction="column" align="start" gap={16}>
      <Section title="Basic">
        <FormLabel>メールアドレス</FormLabel>
      </Section>

      <Section title="Required">
        <FormLabel required>ユーザー名</FormLabel>
      </Section>

      <Section title="With htmlFor">
        <FormLabel htmlFor="email">メールアドレス</FormLabel>
      </Section>
    </Stack>
  ),
};
