module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: "SELECT * FROM users",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserByEmail = (email) => {
    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const addUser = (name, email, password, phone_number) => {
    const query = {
      text: `INSERT INTO users (name, email, password, phone_number) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [name, email, password, phone_number],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const getUserProducts = () => {
    const query = {
      text: `SELECT users.id as user_id,users.name,email,password,phone_number,products.id as product_id, products.name as product_name, 
              expiration_date , quantity_grams , quantity_units, grams_wasted, units_wasted, grams_saved, units_saved
        FROM users
        INNER JOIN products ON users.id = products.user_id`,
    };

    return db
        .query(query)
        .then((result) => result.rows)
        .catch((err) => err);
  };

  const getSavedRecipes = () => {
    const query = {
      text: `SELECT * FROM saved_recipes;`,
    };
    return db
        .query(query)
        .then((result) => result.rows)
        .catch((err) => err);
  };

  const postProduct = (name, expiration_date, user_id, quantity_grams, quantity_units, 
                      grams_wasted, units_wasted, grams_saved, units_saved) => {
    const query = {
      text: `INSERT INTO products (name, expiration_date, user_id, quantity_grams, quantity_units, 
             grams_wasted, units_wasted, grams_saved, units_saved)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`,
             values: [name, expiration_date, user_id, quantity_grams, quantity_units, 
                      grams_wasted, units_wasted, grams_saved, units_saved],
    };
    return db
        .query(query)
        .then((result) => result.rows)
        .catch((err) => err);
  };

  const editProduct = (name, expiration_date, product_id, quantity_grams, quantity_units, 
                      grams_wasted, units_wasted, grams_saved, units_saved) => {
    const query = {
      text: `UPDATE products
             SET name = $1, expiration_date = $2, quantity_grams = $4, quantity_units = $5, grams_wasted = $6,
             units_wasted = $7 ,  grams_saved = $8 , units_saved = $9
             WHERE id = $3`,
             values: [name, expiration_date, product_id, quantity_grams, quantity_units, 
                      grams_wasted, units_wasted, grams_saved, units_saved],
    };
    return db
        .query(query)
        .then((result) => result.rows)
        .catch((err) => err);
  };

  const addRecipe = (recipie_name, user_id, recipe_id) => {
    const query = {
      text: `INSERT INTO saved_recipes (recipie_name, user_id, recipe_id)
              VALUES ($1,$2, $3)`,
             values: [recipie_name, user_id, recipe_id],
    };
    return db
        .query(query)
        .then((result) => result.rows)
        .catch((err) => err);
  };

  const deleteRecipe = (id) => {
    const query = {
      text: `DELETE FROM saved_recipes WHERE id = $1`,
             values: [id],
    };
    return db
        .query(query)
        .then((result) => result.rows)
        .catch((err) => err);
  };




  return {
    getUsers,
    getUserByEmail,
    addUser,
    getUserProducts,
    getSavedRecipes,
    postProduct,
    editProduct,
    addRecipe,
    deleteRecipe
  };
};
