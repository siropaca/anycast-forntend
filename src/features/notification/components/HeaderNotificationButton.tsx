'use client';

import { Popover } from '@base-ui/react/popover';
import { BellIcon } from '@phosphor-icons/react';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';

// TODO: お知らせ機能実装時にモックを実データに差し替える
export function HeaderNotificationButton() {
  return (
    <Popover.Root>
      <Popover.Trigger
        render={
          <IconButton
            icon={<BellIcon size={24} />}
            aria-label="お知らせ"
            color="secondary"
            variant="text"
          />
        }
      />

      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup className="w-80 rounded-md border border-border bg-bg-elevated shadow-lg">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h3 className="text-sm font-semibold">お知らせ</h3>
            </div>

            <p className="px-4 py-8 text-center text-sm text-text-subtle">
              お知らせはありません
            </p>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
