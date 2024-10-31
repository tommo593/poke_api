import React, { useState } from "react";

interface PokemonData {
  sprite: string;
  num: number;
  species: string;
  color: string;
  secondType?: string;
  ability: string;
}

const GetPokemon = () => {
  const [pokemonName, setPokemonName] = useState<string>(""); 
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null); 

  const fetchPokemon = async (nameOrId: string | number) => {
    setLoading(true); 
    setError(null); 
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
      
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
        secondType: json.types[1]?.type.name,
        ability: json.abilities[1]?.ability.name
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

  const fetchPreviousPokemon = () => {
    if (pokemonData && pokemonData.num > 1) {
      fetchPokemon(pokemonData.num - 1); 
    }
  };

  const fetchNextPokemon = () => {
    if (pokemonData) {
      fetchPokemon(pokemonData.num + 1); 
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
            className="btn-primary"
          >
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
          <p>Type: <strong>{pokemonData.color} {pokemonData.secondType}</strong></p>
          <p>Ability: <strong>{pokemonData.ability}</strong></p>
          <div><button className="btn-primary my-4">Save</button></div>
        </div>
      )}
      <div className="flex justify-center gap-4 mb-8">
         <button className="btn-primary" onClick={fetchPreviousPokemon} disabled={loading || (pokemonData?.num === 1)}>
           Prev
         </button>
         <button className="btn-primary" onClick={fetchNextPokemon} disabled={loading}>
           Next
         </button>
      </div>
    </div>
  );
};

export default GetPokemon;
 