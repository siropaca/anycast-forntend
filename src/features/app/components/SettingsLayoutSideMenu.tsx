'use client';

import { usePathname } from 'next/navigation';
import { withActiveState } from '@/components/navigation/SideMenu/helper';
import { SideMenu } from '@/components/navigation/SideMenu/SideMenu';
import { SETTINGS_MENU_SECTIONS } from '@/features/app/config/settingsMenu';

export function SettingsLayoutSideMenu() {
  const pathname = usePathname();

  const sectionsWithActive = withActiveState(SETTINGS_MENU_SECTIONS, pathname);

  return <SideMenu sections={sectionsWithActive} />;
}
