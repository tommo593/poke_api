import { useEffect, useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";

const ListPokemon = () => {

const [pokemon, setPokemon] = useState([]);

const deletePokemon = async (id) => {
  try {
    const deletePokemon = await fetch(`http://localhost:5000/pokeapi/${id}`, {
      method: "DELETE",
    });
    setPokemon(pokeapi.filter((pokemon) => pokemon.pokemon_id !== id));
  } catch (err) {
    console.error(err.message);
  }
}

const GetPokemon = async () => {
  try {
    const response = await fetch("http://localhost:5000/pokeapi");
    const jsonData = await response.json();
    setPokemon(jsonData);
  } catch (err) {
    console.error(err.message);
  }
  };

  useEffect(() => {
    GetPokemon();
  }, [])

  return (
    <div className="mt-4 flex justify-center">
      <table className='table-auto'>
        <thead>
          <tr>
            <th>Pokemon</th>
            <th>caught?</th>
            <th>shiny?</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>{pokemon.pokemon_name}{pokemon.pokemon_sprite}</td>
<td><Checkbox /></td>
<td><Checkbox />
</td>
<td><button className='btn-primary' onClick={() => deletePokemon(pokemon.pokemon_id)}>delete</button></td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ListPokemon