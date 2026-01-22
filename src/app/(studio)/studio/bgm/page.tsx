import type { Metadata } from 'next';
import { Suspense } from 'react';
import { BgmList } from '@/features/studio/bgm/components/BgmList';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.bgm.title,
  robots: { index: false },
};

export default function StudioBgmPage() {
  return (
    <div>
      <h1>{Pages.studio.bgm.title}</h1>
      <Suspense fallback={<p>読み込み中...</p>}>
        <BgmList />
      </Suspense>
    </div>
  );
}
