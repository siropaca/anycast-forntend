import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { VoiceList } from '@/features/studio/voices/components/VoiceList';
import { VoiceListSkeleton } from '@/features/studio/voices/components/VoiceListSkeleton';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.voices.title,
  robots: { index: false },
};

export default function StudioVoicesPage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title={Pages.studio.voices.title}
        description="キャラクターで使用できるボイスの確認ができます"
      />

      <Suspense fallback={<VoiceListSkeleton />}>
        <VoiceList />
      </Suspense>
    </div>
  );
}
