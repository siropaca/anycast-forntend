import { XIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Drawer } from '@/components/utils/Drawer/Drawer';

const meta = {
  title: 'utils/Drawer',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Drawer.Root>
      <Drawer.Trigger className="rounded-md border border-border px-4 py-2 text-text-main">
        左から開く
      </Drawer.Trigger>

      <Drawer.Content side="left" className="w-sidebar">
        <Drawer.Header>
          <Drawer.Close className="p-2 -ml-2">
            <XIcon size={24} weight="bold" aria-label="閉じる" />
          </Drawer.Close>
          <span className="text-xl font-semibold text-primary">Drawer</span>
        </Drawer.Header>

        <Drawer.Body>
          <div className="p-4">
            <p>左からスライドインする Drawer です。</p>
          </div>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  ),
};

export const Right: Story = {
  render: () => (
    <Drawer.Root>
      <Drawer.Trigger className="rounded-md border border-border px-4 py-2 text-text-main">
        右から開く
      </Drawer.Trigger>

      <Drawer.Content side="right" className="w-sidebar">
        <Drawer.Header>
          <span className="text-xl font-semibold text-primary">Drawer</span>
          <div className="ml-auto">
            <Drawer.Close className="p-2 -mr-2">
              <XIcon size={24} weight="bold" aria-label="閉じる" />
            </Drawer.Close>
          </div>
        </Drawer.Header>

        <Drawer.Body>
          <div className="p-4">
            <p>右からスライドインする Drawer です。</p>
          </div>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  ),
};
