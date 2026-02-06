import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CharacterListPage } from '@/features/studio/characters/components/CharacterListPage';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.characters.title,
  robots: { index: false },
};

export default function StudioCharactersPage() {
  return (
    <Suspense fallback={<p>読み込み中...</p>}>
      <CharacterListPage />
    </Suspense>
  );
}
