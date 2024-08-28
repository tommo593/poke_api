import type { Query } from "@favware/graphql-pokemon";

interface GraphQLPokemonResponse<K extends keyof Omit<Query, "__typename">> {
  data: Record<K, Omit<Query[K], "__typename">>;
}

const GetPokemon = () => {
  fetch("https://graphqlpokemon.favware.tech/v8", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
            {
              getPokemon(pokemon: dragonite) {
                  sprite
                  num
                  species
                  color
              }
            }
          `,
    }),
  })
    .then((res) => res.json() as Promise<GraphQLPokemonResponse<"getPokemon">>)
    .then((json) => console.log(json.data));

  return <></>;
};

export default GetPokemon;
