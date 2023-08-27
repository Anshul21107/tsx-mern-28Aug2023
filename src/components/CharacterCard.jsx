import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import CharacterModal from './CharacterModal';

const speciesColors = {
  "Droid": "bg-green-300",
  "Unknown": "bg-red-400",
};


const CharacterCard = ({ character }) => {
    const [speciesName, setSpeciesName] = useState("Unknown");
    const [cardColor, setCardColor] = useState("bg-gray-300");
  const randomImageId = Math.floor(Math.random() * 1000);
    const [showModal, setShowModal] = useState(false);

 useEffect(() => {
    const fetchSpeciesName = async () => {
      try {
        if (character.species.length > 0) {
          const speciesUrl = character.species[0];
          const response = await axios.get(speciesUrl);
          setSpeciesName(response.data.name);
        }
      } catch (error) {
        console.error('Error fetching species name:', error);
      }
    };

    fetchSpeciesName();
  }, [character]);

  useEffect(() => {
    if (speciesColors[speciesName]) {
      setCardColor(speciesColors[speciesName]);
    }
  }, [speciesName]);


  return (
    <>
    <div className={`w-full md:w-1/2 lg:w-1/3 p-4`} onClick={()=>{
        setShowModal(true);
    }}>
      <div className={`rounded-lg p-4 hover:shadow-lg transition ${cardColor} hover:scale-105 duration-300`} >
        <img src={`https://picsum.photos/200/300?random=${randomImageId}`} alt={character.name} className="w-full h-48 object-cover rounded" />
        <h2 className="text-xl font-semibold mt-2">{character.name}</h2>
      </div>
    </div>

    {showModal && <CharacterModal setShowModal={setShowModal} character={character}/>}
    </>
  );
};

export default CharacterCard;
