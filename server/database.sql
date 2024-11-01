CREATE DATABASE pokeapi;

CREATE TABLE haveCaught(
    id SERIAL PRIMARY KEY,
     name VARCHAR(50),
    api_id INT UNIQUE,
    types VARCHAR(100),
    sprite_url VARCHAR(255)
);