import React from 'react';
import { Character } from '../../types/character';
import { CharacterCard } from './CharacterCard';

interface CharacterGridProps {
  characters: Character[];
  onRequestDelete?: (character: Character) => void;
}

export const CharacterGrid: React.FC<CharacterGridProps> = ({ characters, onRequestDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {characters.map(character => (
        <CharacterCard
          key={character.id}
          character={character}
          onRequestDelete={onRequestDelete}
        />
      ))}
    </div>
  );
};
