var express = require("express");
var cors = require("cors"); // Import the cors package
var { createHandler } = require("graphql-http/lib/use/express");
var { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    getPokemon(pokemon: String!): Pokemon
  }

  type Pokemon {
    sprite: String
    num: Int
    species: String
    color: String
  }
`);

// Sample data for demonstration purposes
const pokemonData = {
  dragonite: {
    sprite: "https://img.pokemondb.net/sprites/sword-shield/normal/dragonite.png",
    num: 149,
    species: "Dragonite",
    color: "Yellow",
  },
  pikachu: {
    sprite: "https://img.pokemondb.net/sprites/sword-shield/normal/pikachu.png",
    num: 25,
    species: "Pikachu",
    color: "Yellow",
  },
};

// The root provides a resolver function for each API endpoint
var root = {
  hello() {
    return "Hello world!";
  },
  getPokemon({ pokemon }) {
    return pokemonData[pokemon.toLowerCase()] || null;
  },
};

var app = express();

// Use CORS middleware
app.use(cors());

// Create and use the GraphQL handler.
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

// Start the server at port
app.listen(3147, () => {
  console.log("Running a GraphQL API server at http://localhost:3147");
});