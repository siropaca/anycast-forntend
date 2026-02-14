import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import type {
  ResponseCategoryResponse,
  ResponseChannelResponseArtwork,
} from '@/libs/api/generated/schemas';

const ARTWORK_SIZE = 150;

interface Props {
  name: string;
  artwork?: ResponseChannelResponseArtwork;
  category: ResponseCategoryResponse;
  description: string;
}

export function ChannelInfoSection({
  name,
  artwork,
  category,
  description,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
      <ArtworkImage
        src={artwork?.url}
        alt={name}
        size={ARTWORK_SIZE}
        priority
      />

      <div className="flex flex-1 flex-col gap-3">
        <p className="text-sm text-text-subtle">{category.name}</p>

        {description ? (
          <p className="whitespace-pre-wrap">{description}</p>
        ) : (
          <p className="text-sm text-text-subtle">説明文が設定されていません</p>
        )}
      </div>
    </div>
  );
}
