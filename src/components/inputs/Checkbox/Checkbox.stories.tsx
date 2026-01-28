import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Checkbox } from '@/components/inputs/Checkbox/Checkbox';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'inputs/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    size: 'md',
    label: 'ラベル',
    indeterminate: false,
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="column">
      <Checkbox size="sm" label="Small" defaultChecked />
      <Checkbox size="md" label="Medium" defaultChecked />
      <Checkbox size="lg" label="Large" defaultChecked />
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Unchecked">
        <Checkbox label="未選択" />
      </Section>

      <Section title="Checked">
        <Checkbox label="選択済み" defaultChecked />
      </Section>

      <Section title="Indeterminate">
        <Stack direction="column">
          <Checkbox label="不確定" indeterminate />
          <Checkbox label="不確定（無効）" indeterminate disabled />
        </Stack>
      </Section>

      <Section title="Disabled">
        <Stack direction="column">
          <Checkbox label="無効（未選択）" disabled />
          <Checkbox label="無効（選択済み）" disabled defaultChecked />
        </Stack>
      </Section>

      <Section title="Error">
        <Checkbox label="エラー" error />
      </Section>
    </Stack>
  ),
};

function ControlledExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      label={checked ? 'チェック済み' : '未チェック'}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}

export const Controlled: Story = {
  render: () => (
    <Section title="Controlled">
      <ControlledExample />
    </Section>
  ),
};

export const WithoutLabel: Story = {
  render: () => (
    <Stack direction="column">
      <Checkbox size="sm" defaultChecked />
      <Checkbox size="md" defaultChecked />
      <Checkbox size="lg" defaultChecked />
    </Stack>
  ),
};
