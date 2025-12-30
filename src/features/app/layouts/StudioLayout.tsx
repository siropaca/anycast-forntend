import { SquaresFourIcon, VideoIcon } from '@phosphor-icons/react/ssr';
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
        label: Pages.studio.dashboard.title,
        href: Pages.studio.dashboard.path(),
        icon: SquaresFourIcon,
      },
      {
        label: Pages.studio.channels.title,
        href: Pages.studio.channels.path(),
        icon: VideoIcon,
      },
    ],
  },
];

export function StudioLayout({ children }: Props) {
  return (
    <div className="flex flex-1">
      <Sidebar>
        <SideMenu sections={MENU_SECTIONS} />
      </Sidebar>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
