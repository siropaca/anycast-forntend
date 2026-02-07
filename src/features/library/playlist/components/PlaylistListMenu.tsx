'use client';

import { Menu } from '@base-ui/react/menu';
import { DotsThreeIcon, PlusIcon } from '@phosphor-icons/react';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { PlaylistCreateModal } from '@/features/library/playlist/components/PlaylistCreateModal';
import { useCreatePlaylistModal } from '@/features/library/playlist/hooks/useCreatePlaylistModal';

export function PlaylistListMenu() {
  const createModal = useCreatePlaylistModal();

  function handleCreate() {
    createModal.open();
  }

  return (
    <>
      <Menu.Root>
        <Menu.Trigger
          render={
            <IconButton
              icon={<DotsThreeIcon size={26} weight="bold" />}
              aria-label="メニュー"
              color="secondary"
              variant="text"
            />
          }
        />

        <Menu.Portal>
          <Menu.Positioner sideOffset={8}>
            <Menu.Popup className="min-w-36 rounded-md border border-border bg-bg-elevated p-1 shadow-lg">
              <Menu.Item
                className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm outline-none hover:bg-bg-hover-strong focus:bg-bg-hover-strong"
                onClick={handleCreate}
              >
                <PlusIcon size={16} />
                新規作成
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <PlaylistCreateModal createModal={createModal} />
    </>
  );
}
