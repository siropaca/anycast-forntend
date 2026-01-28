import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArtworkImage } from '@/components/dataDisplay/ArtworkImage/ArtworkImage';
import { ArtworkImageSkeleton } from '@/components/dataDisplay/ArtworkImage/ArtworkImageSkeleton';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'dataDisplay/ArtworkImage',
  component: ArtworkImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ArtworkImage>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImage = 'https://picsum.photos/seed/artwork/400/400';

export const Playground: Story = {
  args: {
    src: sampleImage,
    alt: 'Channel artwork',
    size: 128,
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack>
      <ArtworkImage src={sampleImage} size={64} alt="64px artwork" />
      <ArtworkImage src={sampleImage} size={128} alt="128px artwork" />
      <ArtworkImage src={sampleImage} size={192} alt="192px artwork" />
    </Stack>
  ),
};

export const NoImage: Story = {
  render: () => (
    <Stack>
      <ArtworkImage size={64} />
      <ArtworkImage size={128} />
      <ArtworkImage size={192} />
    </Stack>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="With Image">
        <Stack>
          <ArtworkImage src={sampleImage} size={64} alt="64px" />
          <ArtworkImage src={sampleImage} size={128} alt="128px" />
          <ArtworkImage src={sampleImage} size={192} alt="192px" />
        </Stack>
      </Section>
      <Section title="No Image">
        <Stack>
          <ArtworkImage size={64} />
          <ArtworkImage size={128} />
          <ArtworkImage size={192} />
        </Stack>
      </Section>
      <Section title="Skeleton">
        <Stack>
          <ArtworkImageSkeleton size={64} />
          <ArtworkImageSkeleton size={128} />
          <ArtworkImageSkeleton size={192} />
        </Stack>
      </Section>
    </Stack>
  ),
};

export const Skeleton: Story = {
  render: () => (
    <Stack>
      <ArtworkImageSkeleton size={64} />
      <ArtworkImageSkeleton size={128} />
      <ArtworkImageSkeleton size={192} />
    </Stack>
  ),
};
