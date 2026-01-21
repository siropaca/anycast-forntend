'use client';

import { usePathname } from 'next/navigation';
import { withActiveState } from '@/components/navigation/SideMenu/helper';
import { SideMenu } from '@/components/navigation/SideMenu/SideMenu';
import { STUDIO_MENU_SECTIONS } from '@/features/app/constants/studioMenu';

export function StudioLayoutSideMenu() {
  const pathname = usePathname();

  const sectionsWithActive = withActiveState(STUDIO_MENU_SECTIONS, pathname);

  return <SideMenu sections={sectionsWithActive} />;
}
