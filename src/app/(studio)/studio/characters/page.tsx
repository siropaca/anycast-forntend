import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CharacterList } from '@/features/studio/characters/components/CharacterList';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.characters.title,
  robots: { index: false },
};

export default function StudioCharactersPage() {
  return (
    <div>
      <Suspense fallback={<p>読み込み中...</p>}>
        <CharacterList />
      </Suspense>
    </div>
  );
}
