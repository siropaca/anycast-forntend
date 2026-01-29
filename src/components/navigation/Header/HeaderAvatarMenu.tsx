'use client';

import { Menu } from '@base-ui/react/menu';
import { GearIcon, SignOutIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Avatar } from '@/components/dataDisplay/Avatar/Avatar';
import { Pages } from '@/libs/pages';

export function HeaderAvatarMenu() {
  function handleSignOut() {
    signOut({ callbackUrl: Pages.home.path() });
  }

  return (
    <Menu.Root>
      <Menu.Trigger className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <Avatar fallback="U" />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner sideOffset={8}>
          <Menu.Popup className="min-w-40 rounded-md border border-border bg-bg-elevated p-1 shadow-lg">
            <Menu.Item
              className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm outline-none hover:bg-bg-hover-strong focus:bg-bg-hover-strong"
              render={<Link href={Pages.settings.index.path()} />}
            >
              <GearIcon size={16} />
              設定
            </Menu.Item>

            <Menu.Item
              className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm outline-none hover:bg-bg-hover-strong focus:bg-bg-hover-strong"
              onClick={handleSignOut}
            >
              <SignOutIcon size={16} />
              ログアウト
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
