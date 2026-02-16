'use client';

import { useRouter } from 'next/navigation';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { PlaylistDeleteDialog } from '@/features/library/playlist/components/PlaylistDeleteDialog';
import { PlaylistDetailMenu } from '@/features/library/playlist/components/PlaylistDetailMenu';
import { PlaylistEditModal } from '@/features/library/playlist/components/PlaylistEditModal';
import { PlaylistEpisodeItem } from '@/features/library/playlist/components/PlaylistEpisodeItem';
import { usePlaylistDeleteDialog } from '@/features/library/playlist/hooks/usePlaylistDeleteDialog';
import { usePlaylistDetail } from '@/features/library/playlist/hooks/usePlaylistDetail';
import { usePlaylistEditModal } from '@/features/library/playlist/hooks/usePlaylistEditModal';
import { Pages } from '@/libs/pages';

interface Props {
  playlistId: string;
}

export function PlaylistDetail({ playlistId }: Props) {
  const router = useRouter();
  const { playlist } = usePlaylistDetail(playlistId);

  const deleteDialog = usePlaylistDeleteDialog(playlistId);
  const editModal = usePlaylistEditModal({
    playlistId,
    currentName: playlist.name,
  });

  async function handleDeleteConfirm() {
    const success = await deleteDialog.confirm();
    if (success) {
      router.push(Pages.library.playList.path());
    }
  }

  return (
    <div>
      <SectionTitle
        title={playlist.name}
        backHref={Pages.library.playList.path()}
        action={
          <PlaylistDetailMenu
            disabled={playlist.isDefault}
            disabledReason="デフォルトの再生リストは編集・削除できません"
            onEdit={editModal.open}
            onDelete={deleteDialog.open}
          />
        }
      />

      {playlist.items.length === 0 ? (
        <p className="py-12 text-center text-text-subtle">
          再生リストにエピソードはありません
        </p>
      ) : (
        <ArtworkGrid>
          {playlist.items.map((item, index) => (
            <PlaylistEpisodeItem
              key={item.id}
              item={item}
              priority={index < 6}
            />
          ))}
        </ArtworkGrid>
      )}

      <PlaylistDeleteDialog
        playlistName={playlist.name}
        open={deleteDialog.isOpen}
        error={deleteDialog.error}
        onClose={deleteDialog.close}
        onConfirm={handleDeleteConfirm}
      />

      <PlaylistEditModal editModal={editModal} />
    </div>
  );
}
