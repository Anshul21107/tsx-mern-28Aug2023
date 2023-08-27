import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterModal = ({ character, setShowModal }) => {
  const species = character.species.length > 0 ? character.species[0] : "Unknown";
  const [homeworld, setHomeworld] = useState(null);

  useEffect(() => {
    const fetchHomeworld = async () => {
      try {
        if (character.homeworld) {
          const response = await axios.get(character.homeworld);
          setHomeworld(response.data);
        }
      } catch (error) {
        console.error('Error fetching homeworld:', error);
      }
    };

    fetchHomeworld();
  }, [character]);

  // Format date in dd-MM-yyyy format
  const formattedAddedDate = new Date(character.created).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-100">
      <div className="bg-white rounded-lg p-4 max-w-lg overflow-y-auto shadow-lg">
        <h2 className="text-2xl font-semibold mb-2">{character.name}</h2>
        <p className="mb-2">Species: {species}</p>
        <p>Height: {character.height} cm</p>
        <p>Mass: {character.mass} kg</p>
        <p>Added to API: {formattedAddedDate}</p>
        <p>Films: {character.films.length}</p>
        <p>Birth Year: {character.birth_year}</p>

        {homeworld && (
          <div>
            <h3 className="text-lg font-semibold mt-4">Homeworld</h3>
            <p>Name: {homeworld.name}</p>
            <p>Terrain: {homeworld.terrain}</p>
            <p>Climate: {homeworld.climate}</p>
            <p>Residents: {homeworld.residents.length}</p>
          </div>
        )}

        <button
          onClick={() => {
            setShowModal(false);
          }}
          className="mt-4 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CharacterModal;
