import { PlusIcon } from '@phosphor-icons/react/ssr';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { BgmList } from '@/features/studio/bgm/components/BgmList';
import { BgmUploadForm } from '@/features/studio/bgm/components/BgmUploadForm';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.bgm.title,
  robots: { index: false },
};

export default function StudioBgmPage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title={Pages.studio.bgm.title}
        description="エピソードで使用するBGMの管理ができます"
        action={<Button leftIcon={<PlusIcon size={18} />}>新規追加</Button>}
      />

      <BgmUploadForm />

      <Suspense fallback={<p>読み込み中...</p>}>
        <BgmList />
      </Suspense>
    </div>
  );
}
