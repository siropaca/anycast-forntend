import { UserIcon, WalletIcon } from '@phosphor-icons/react/ssr';
import { Sidebar } from '@/components/navigation/Sidebar';
import type { MenuSection } from '@/components/navigation/SideMenu';
import { SideMenu } from '@/components/navigation/SideMenu';
import { Pages } from '@/libs/pages';

interface Props {
  children: React.ReactNode;
}

const MENU_SECTIONS: MenuSection[] = [
  {
    items: [
      {
        label: Pages.settings.account.title,
        href: Pages.settings.account.path(),
        icon: UserIcon,
      },
      {
        label: Pages.settings.subscription.title,
        href: Pages.settings.subscription.path(),
        icon: WalletIcon,
      },
    ],
  },
];

export function SettingsLayout({ children }: Props) {
  return (
    <div className="flex flex-1">
      <Sidebar>
        <SideMenu sections={MENU_SECTIONS} />
      </Sidebar>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
