import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Artwork } from '@/components/dataDisplay/Artwork/Artwork';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'dataDisplay/Artwork',
  component: Artwork,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Artwork>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImage = 'https://picsum.photos/seed/artwork/400/400';

export const Playground: Story = {
  args: {
    src: sampleImage,
    alt: 'Sample artwork',
    size: 128,
    title: 'Episode Title',
    subtext: 'Channel Name',
  },
};

export const WithoutSubtext: Story = {
  args: {
    src: sampleImage,
    alt: 'Sample artwork',
    title: 'Title Only',
  },
};

export const NoImage: Story = {
  args: {
    title: 'No Image Artwork',
    subtext: 'Fallback gradient',
  },
};

export const Sizes: Story = {
  args: { title: '' },
  render: () => (
    <Stack align="start">
      <Artwork
        src={sampleImage}
        size={120}
        title="Small"
        subtext="120px"
      />
      <Artwork
        src={sampleImage}
        size={170}
        title="Medium"
        subtext="170px"
      />
      <Artwork
        src={sampleImage}
        size={220}
        title="Large"
        subtext="220px"
      />
    </Stack>
  ),
};

export const LongText: Story = {
  args: {
    src: sampleImage,
    title: 'This is a very long episode title that should be truncated',
    subtext: 'This is a very long channel name that should also be truncated',
  },
};

export const AllVariants: Story = {
  args: { title: '' },
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="With Image">
        <Stack align="start">
          <Artwork
            src={sampleImage}
            size={128}
            title="Episode Title"
            subtext="Channel Name"
          />
          <Artwork
            src={sampleImage}
            size={128}
            title="Title Only"
          />
        </Stack>
      </Section>
      <Section title="No Image">
        <Stack align="start">
          <Artwork
            size={128}
            title="No Image"
            subtext="Fallback"
          />
          <Artwork
            size={128}
            title="No Image Title Only"
          />
        </Stack>
      </Section>
      <Section title="Sizes">
        <Stack align="start">
          <Artwork
            src={sampleImage}
            size={120}
            title="Small"
            subtext="120px"
          />
          <Artwork
            src={sampleImage}
            size={170}
            title="Medium"
            subtext="170px"
          />
          <Artwork
            src={sampleImage}
            size={220}
            title="Large"
            subtext="220px"
          />
        </Stack>
      </Section>
    </Stack>
  ),
};
