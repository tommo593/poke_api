import React, { useState } from "react";
import type { Query } from "@favware/graphql-pokemon";

interface GraphQLPokemonResponse<K extends keyof Omit<Query, "__typename">> {
  data: Record<K, Omit<Query[K], "__typename">>;
}

const GetPokemon = () => {
  const [pokemonName, setPokemonName] = useState<string>(""); // State for the user's input
  const [pokemonData, setPokemonData] = useState<Query["getPokemon"] | null>(
    null
  ); // State for the fetched data
  const [loading, setLoading] = useState<boolean>(false); // State to show loading
  const [error, setError] = useState<string | null>(null); // State to handle errors

  const fetchPokemon = async (name: string) => {
    setLoading(true); // Set loading to true when starting fetch
    setError(null); // Reset error state
    try {
      const response = await fetch("https://graphqlpokemon.favware.tech/v8", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            {
              getPokemon(pokemon: "${name}") {
                sprite
                num
                species
                color
              }
            }
          `,
        }),
      });

      const json = (await response.json()) as GraphQLPokemonResponse<"getPokemon">;

      if (json.data.getPokemon) {
        setPokemonData(json.data.getPokemon); // Store the fetched data
      } else {
        setError("No data found for this Pokémon."); // Handle case where no data is returned
      }
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
        <div className="flex flex-row justify-center gap-4">
          <input
            type="text"
            placeholder="Enter Pokémon name"
            value={pokemonName} // Bind input to state
            onChange={(e) => setPokemonName(e.target.value)} // Update state on change
            className="bg-blue-300 shadow-md w-60 outline-none"
          />
          <button
            type="submit" // Specify button type
            className="border border-gray-500 bg-blue-300 hover:bg-blue-400 active:bg-blue-800 px-4"
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
          <img src={pokemonData.sprite} alt={pokemonData.species} />
          <p>Number: {pokemonData.num}</p>
          <p>Color: {pokemonData.color}</p>
        </div>
      )}
    </div>
  );
};

export default GetPokemon;

 