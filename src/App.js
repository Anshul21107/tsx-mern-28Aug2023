// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterList from './components/ChacterList';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/people/');
        setCharacters(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className={`container mx-auto py-8 overflow-hidden`}>
      <h1 className="text-3xl font-semibold mb-4 flex items-center justify-center">Star Wars Characters</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <CharacterList characters={characters} />
      )}
    </div>
  );
};

export default App;
