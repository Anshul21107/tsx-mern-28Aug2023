
import React from 'react';
import CharacterCard from './CharacterCard';

const CharacterList = ({ characters }) => {
  return (
    <div className="flex flex-wrap -mx-4">
      {characters.map((character) => (
        <CharacterCard key={character.name} character={character} />
      ))}
    </div>
  );
};

export default CharacterList;
