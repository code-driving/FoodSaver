DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS saved_recipes CASCADE;
DROP TABLE IF EXISTS quantities CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  phone_number INTEGER NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  name varchar(255) NOT NULL,
  expiration_date DATE NOT NULL,
  quantity_grams float,
  quantity_units INTEGER,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE saved_recipes (
  id SERIAL PRIMARY KEY NOT NULL,
  recipie_name varchar(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  recipe_id INTEGER NOT NULL
);

CREATE TABLE quantities (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  grams_wasted float, 
  units_wasted INTEGER,
  grams_saved float, 
  units_saved INTEGER
);