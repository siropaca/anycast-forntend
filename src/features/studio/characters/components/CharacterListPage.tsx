'use client';

import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { CharacterCreateModal } from '@/features/studio/characters/components/CharacterCreateModal';
import { CharacterList } from '@/features/studio/characters/components/CharacterList';
import { Pages } from '@/libs/pages';

export function CharacterListPage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title={Pages.studio.characters.title}
        description="エピソードで使用しているキャラクターの管理ができます"
        action={<CharacterCreateModal />}
      />

      <CharacterList />
    </div>
  );
}
