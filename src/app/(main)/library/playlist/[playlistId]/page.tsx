import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PlaylistDetail } from '@/features/library/playlist/components/PlaylistDetail';
import { PlaylistDetailSkeleton } from '@/features/library/playlist/components/PlaylistDetailSkeleton';
import { getMePlaylistsPlaylistId } from '@/libs/api/generated/me/me';
import type { ResponsePlaylistDetailResponse } from '@/libs/api/generated/schemas/responsePlaylistDetailResponse';
import { unwrapResponse } from '@/libs/api/unwrapResponse';
import type { PlaylistDetailParams } from '@/libs/pages/mainPages';

interface Props {
  params: Promise<PlaylistDetailParams>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { playlistId } = await params;
  const response = await getMePlaylistsPlaylistId(playlistId);
  const playlist = unwrapResponse<ResponsePlaylistDetailResponse>(response);

  return {
    title: playlist.name,
    robots: { index: false },
  };
}

export default async function PlaylistDetailPage({ params }: Props) {
  const { playlistId } = await params;

  return (
    <Suspense fallback={<PlaylistDetailSkeleton />}>
      <PlaylistDetail playlistId={playlistId} />
    </Suspense>
  );
}
