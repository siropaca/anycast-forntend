'use client';

import { usePathname } from 'next/navigation';
import { withActiveState } from '@/components/navigation/SideMenu/helper';
import { SideMenu } from '@/components/navigation/SideMenu/SideMenu';
import {
  MAIN_MENU_SECTIONS,
  MY_PAGE_SECTION,
} from '@/features/app/constants/mainMenu';

interface Props {
  isLoggedIn: boolean;
}

export function MainLayoutSideMenu({ isLoggedIn }: Props) {
  const pathname = usePathname();

  const sections = isLoggedIn
    ? [...MAIN_MENU_SECTIONS, MY_PAGE_SECTION]
    : MAIN_MENU_SECTIONS;

  const sectionsWithActive = withActiveState(sections, pathname);

  return <SideMenu sections={sectionsWithActive} />;
}
