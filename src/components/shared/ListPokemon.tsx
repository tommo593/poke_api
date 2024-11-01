import { useEffect, useState } from 'react';
import { Checkbox } from "../ui/checkbox";

interface Pokemon {
  pokemon_id: number;  // Assuming this is the ID in your database
  num: number;         // Pokémon number
  species: string;     // Pokémon species name
  sprite: string;      // URL for Pokémon sprite image
}

const ListPokemon: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]); // State for Pokémon array

 // Function to delete a Pokémon
const deletePokemon = async (id: number) => {
  try {
    await fetch(`http://localhost:5000/haveCaught/${id}`, {
      method: "DELETE",
    });
    setPokemon(pokemon.filter((p) => p.pokemon_id !== id));
  } catch (err: any) {  // Set `err` as `any` or `Error` type
    console.error((err as Error).message);
  }
};

// Function to fetch Pokémon data
const getPokemon = async () => {
  try {
    const response = await fetch("http://localhost:5000/haveCaught");
    const jsonData = await response.json();
    setPokemon(jsonData);
  } catch (err: any) {
    console.error((err as Error).message);
  }
};

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <div className="mt-4 flex justify-center">
      <table className="table-auto">
        <thead>
          <tr>
            <th>Pokemon</th>
            <th>caught?</th>
            <th>shiny?</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {pokemon.map((p) => (
            <tr key={p.pokemon_id}>
              <td>{p.num} <img src={p.sprite} alt={p.species} /></td>
              <td><Checkbox /></td>
              <td><Checkbox /></td>
              <td>
                <button className="btn-primary" onClick={() => deletePokemon(p.pokemon_id)}>
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListPokemon;