import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ClampText } from '@/components/dataDisplay/ClampText/ClampText';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'dataDisplay/ClampText',
  component: ClampText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ClampText>;

export default meta;
type Story = StoryObj<typeof meta>;

const longText = `これはとても長いテキストのサンプルです。複数行にわたる説明文が表示されるケースで、指定した行数を超えた場合に「...さらに表示」ボタンが表示されます。
ボタンをクリックすると全文が表示されます。
3行目のテキストです。
4行目のテキストです。
5行目のテキストです。`;

const shortText = '短いテキストの場合はボタンが表示されません。';

export const Playground: Story = {
  args: {
    children: longText,
    lines: 3,
  },
};

export const ShortText: Story = {
  args: {
    children: shortText,
    lines: 3,
  },
};

export const Lines: Story = {
  args: {
    children: longText,
    lines: 2,
  },
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="1行">
        <ClampText lines={1}>{longText}</ClampText>
      </Section>
      <Section title="2行">
        <ClampText lines={2}>{longText}</ClampText>
      </Section>
      <Section title="3行（デフォルト）">
        <ClampText lines={3}>{longText}</ClampText>
      </Section>
      <Section title="5行">
        <ClampText lines={5}>{longText}</ClampText>
      </Section>
    </Stack>
  ),
};
