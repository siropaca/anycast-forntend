import {
  HeartIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Button } from '@/components/inputs/Button/Button';

const meta = {
  title: 'inputs/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    color: 'primary',
  },
};

export const Small: Story = {
  args: {
    size: "md",
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const PrimarySolid: Story = {
  args: {
    color: 'primary',
    variant: 'solid',
  },
};

export const PrimaryOutline: Story = {
  args: {
    color: 'primary',
    variant: 'outline',
  },
};

export const WhiteSolid: Story = {
  args: {
    color: 'white',
    variant: 'solid',
  },
};

export const WhiteOutline: Story = {
  args: {
    color: 'white',
    variant: 'outline',
  },
};

export const WithLeftIcon: Story = {
  args: {
    leftIcon: <PlusIcon size={16} />,
    children: '追加',
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: <MagnifyingGlassIcon size={16} />,
    children: '検索',
  },
};

export const WithBothIcons: Story = {
  args: {
    leftIcon: <HeartIcon size={16} />,
    rightIcon: <PlusIcon size={16} />,
    children: 'お気に入りに追加',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledOutline: Story = {
  args: {
    variant: 'outline',
    disabled: true,
  },
};
