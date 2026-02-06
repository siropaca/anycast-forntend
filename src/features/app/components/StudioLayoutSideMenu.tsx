'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { withActiveState } from '@/components/navigation/SideMenu/helper';
import { SideMenu } from '@/components/navigation/SideMenu/SideMenu';
import { FeedbackDrawer } from '@/features/app/components/FeedbackDrawer';
import { createFeedbackSection } from '@/features/app/constants/feedbackMenu';
import { createStudioMenuSections } from '@/features/app/constants/studioMenu';
import { StudioSettingsModal } from '@/features/studio/settings/components/StudioSettingsModal';

export function StudioLayoutSideMenu() {
  const pathname = usePathname();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { sections, bottomSections } = createStudioMenuSections({
    onSettingsClick: () => setSettingsOpen(true),
  });
  const feedbackSection = createFeedbackSection(() => setFeedbackOpen(true));

  return (
    <>
      <SideMenu
        sections={withActiveState(sections, pathname)}
        bottomSections={[
          ...withActiveState(bottomSections, pathname),
          feedbackSection,
        ]}
      />

      {/* 設定モーダル */}
      {settingsOpen && (
        <StudioSettingsModal
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
        />
      )}

      {/* フィードバックドロワー */}
      <FeedbackDrawer open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </>
  );
}
