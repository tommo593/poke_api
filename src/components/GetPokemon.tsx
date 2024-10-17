import React, { useState } from "react";

interface PokemonData {
  sprite: string;
  num: number;
  species: string;
  color: string;
}

const GetPokemon = () => {
  const [pokemonName, setPokemonName] = useState<string>(""); // State for the user's input
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null); // State for the fetched data
  const [loading, setLoading] = useState<boolean>(false); // State to show loading
  const [error, setError] = useState<string | null>(null); // State to handle errors

  const fetchPokemon = async (name: string) => {
    setLoading(true); // Set loading to true when starting fetch
    setError(null); // Reset error state
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
        color: json.types[0].type.name, // Using 'type' instead of color
      }); // Store the fetched data
    } catch (err) {
      setError("Error fetching data."); // Handle fetch errors
    } finally {
      setLoading(false); // Set loading to false after fetch completes
    }
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the form from reloading the page
    if (pokemonName.trim()) {
      fetchPokemon(pokemonName.trim().toLowerCase()); // Fetch data with trimmed and lowercase input
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="flex flex-row justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Enter Pokémon name"
            value={pokemonName} // Bind input to state
            onChange={(e) => setPokemonName(e.target.value)} // Update state on change
            className="bg-blue-300 shadow-md w-60 outline-none"
          />
          <button
            type="submit" // Specify button type
            className="border border-gray-500 bg-blue-400 hover:bg-blue-300 active:bg-blue-800 px-4"
          >
            Search
          </button>
        </div>
      </form>

      {loading && <p>Loading...</p>} {/* Show loading state */}
      {error && <p>{error}</p>} {/* Show error message if there's an error */}

      {pokemonData && ( // Display the Pokémon data
        <div>
          <h2>{pokemonData.species}</h2>
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
 