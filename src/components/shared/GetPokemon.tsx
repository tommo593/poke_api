import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface PokemonData {
  sprite: string;
  num: number;
  species: string;
  color: string;
}

const GetPokemon = () => {
  const [pokemonName, setPokemonName] = useState<string>('');
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [savedPokemons, setSavedPokemons] = useState<PokemonData[]>([]);

  const fetchPokemon = async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const json = response.data;

      setPokemonData({
        sprite: json.sprites.front_default,
        num: json.id,
        species: json.name,
        color: json.types[0].type.name,
      });
    } catch (err) {
      setError('Error fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (pokemonName.trim()) {
      fetchPokemon(pokemonName.trim().toLowerCase());
    }
  };

  const savePokemon = async () => {
    if (pokemonData) {
      try {
        const payload = {
          name: pokemonData.species,
          api_id: pokemonData.num,
          types: pokemonData.color,
          sprite_url: pokemonData.sprite,
        };
        await axios.post('http://localhost:5000/haveCaught/save-pokemon', payload) ;
        alert('Pokemon saved successfully!');
        fetchSavedPokemons();
      } catch (err) {
        console.error('Error saving Pokemon:', err);
      }
    }
  };

  const fetchSavedPokemons = async () => {
    try {
      const response = await axios.get('http://localhost:5000/haveCaught/saved-pokemons');
      setSavedPokemons(response.data);
    } catch (err) {
      console.error('Error fetching saved Pokemons:', err);
    }
  };

  useEffect(() => {
    fetchSavedPokemons();
  }, []);

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="flex flex-row justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Enter Pokémon name"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            className="bg-blue-300 shadow-md w-60 outline-none"
          />
          <button type="submit" className="btn-primary">
            Search
          </button>
        </div>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {pokemonData && (
        <div className="border border-white p-4 max-w-80 m-auto rounded-3xl mb-8 shadow-lg">
          <h1>{pokemonData.species}</h1>
          <div className="flex justify-center">
            <img src={pokemonData.sprite} alt={pokemonData.species} />
          </div>
          <p>Number: <strong>{pokemonData.num}</strong></p>
          <p>Type: <strong>{pokemonData.color}</strong></p>
          <div>
            <button onClick={savePokemon} className="btn-primary my-4">Save</button>
          </div>
        </div>
      )}

      <h2>Saved Pokémon</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">Sprite</th>
            <th className="border border-gray-200 p-2">Name</th>
            <th className="border border-gray-200 p-2">Number</th>
            <th className="border border-gray-200 p-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {savedPokemons.map((pokemon) => (
            <tr key={pokemon.num}>
              <td className="border border-gray-200 p-2">
                <img src={pokemon.sprite} alt={pokemon.species} width="50" />
              </td>
              <td className="border border-gray-200 p-2">{pokemon.species}</td>
              <td className="border border-gray-200 p-2">{pokemon.num}</td>
              <td className="border border-gray-200 p-2">{pokemon.color}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetPokemon;