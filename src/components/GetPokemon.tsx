import React, { useState } from "react";

interface PokemonData {
  sprite: string;
  num: number;
  species: string;
  color: string;
}

const GetPokemon = () => {
  const [pokemonName, setPokemonName] = useState<string>(""); 
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null); 

  const fetchPokemon = async (name: string) => {
    setLoading(true); 
    setError(null); 
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      
      if (!response.ok) {
        setError("No data found for this Pokémon.");
        return;
      }

      const json = await response.json();

      setPokemonData({
        sprite: json.sprites.front_default,
        num: json.id,
        species: json.name,
        color: json.types[0].type.name, 
      }); 
    } catch (err) {
      setError("Error fetching data."); 
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
          <button
            type="submit" 
            className="border border-gray-500 bg-blue-400 hover:bg-blue-300 active:bg-blue-800 px-4"
          >
            Search
          </button>
        </div>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>} 

      {pokemonData && ( 
        <div className="border border-white p-4 max-w-80 m-auto rounded-3xl mb-8">
          <h1>{pokemonData.species}</h1>
          <div className="flex justify-center">
          <img src={pokemonData.sprite} alt={pokemonData.species} />
          </div>
          <p>Number: <strong>{pokemonData.num}</strong></p>
          <p>Type: <strong>{pokemonData.color}</strong></p>
        </div>
      )}
    </div>
  );
};

export default GetPokemon;
 