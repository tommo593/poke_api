const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "TdBourne0108.",
  host: "localhost",
  port: 5432,
  database: "pokeapi",
});

module.exports = pool;