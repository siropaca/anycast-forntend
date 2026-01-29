'use client';

import { usePathname } from 'next/navigation';
import { withActiveState } from '@/components/navigation/SideMenu/helper';
import { SideMenu } from '@/components/navigation/SideMenu/SideMenu';
import { createStudioMenuSections } from '@/features/app/constants/studioMenu';

export function StudioLayoutSideMenu() {
  const pathname = usePathname();

  function handleFeedbackClick() {
    // TODO: フィードバックモーダルを開く
  }

  const { sections, bottomSections } = createStudioMenuSections({
    onFeedbackClick: handleFeedbackClick,
  });

  return (
    <SideMenu
      sections={withActiveState(sections, pathname)}
      bottomSections={withActiveState(bottomSections, pathname)}
    />
  );
}
