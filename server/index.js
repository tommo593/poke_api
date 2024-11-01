// Import necessary packages
const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Apply middlewares
app.use(cors());
app.use(express.json());

// Configure PostgreSQL connection using environment variables
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: parseInt(process.env.PGPORT || '5432'),
});

// Endpoint to save Pokémon data to the "haveCaught" table
app.post('/api/save-pokemon', async (req, res) => {
  const { name, api_id, types, sprite_url } = req.body;

  const query = `
    INSERT INTO haveCaught (name, api_id, types, sprite_url)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (api_id) DO NOTHING;
  `;

  const values = [name, api_id, types, sprite_url];

  try {
    await pool.query(query, values);
    res.status(200).json({ message: 'Pokemon saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save Pokemon.' });
  }
});

// Endpoint to fetch all saved Pokémon data from "haveCaught"
app.get('/api/saved-pokemons', async (_, res) => {
  try {
    const result = await pool.query('SELECT * FROM haveCaught');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch saved Pokemons.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});