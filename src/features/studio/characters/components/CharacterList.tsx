'use client';

import { useMyCharacterList } from '@/features/studio/characters/hooks/useMyCharacterList';

export function CharacterList() {
  const { characters } = useMyCharacterList();

  return (
    <ul>
      {characters.length === 0 && <li>キャラクターがありません</li>}

      {characters.map((character) => (
        <li key={character.id}>{character.name}</li>
      ))}
    </ul>
  );
}
