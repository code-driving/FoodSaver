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
              expiration_date , quantity_grams , quantity_units, score
        FROM users
        INNER JOIN products ON users.id = products.user_id`,
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getPaticularUserProducts = (id) => {
    const query = {
      text: `SELECT * FROM products
             WHERE user_id = ${id}`,
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserSavedRecipes = (id) => {
    const query = {
      text: `SELECT * FROM saved_recipes
             WHERE user_id = ${id};`,
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

  const postProduct = (
    name,
    expiration_date,
    user_id,
    quantity_grams,
    quantity_units,
    grams_wasted
  ) => {
    const query = {
      text: `INSERT INTO products (name, expiration_date, user_id, quantity_grams, quantity_units)
             VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      values: [name, expiration_date, user_id, quantity_grams, quantity_units],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const editProduct = (name, expiration_date, product_id, quantity_grams, quantity_units) => {
    const query = {
     text: `UPDATE products
            SET name = $1, expiration_date = $2, quantity_grams = $4, quantity_units = $5
            WHERE id =$3 RETURNING *;`,
            values: [name, expiration_date, product_id, quantity_grams, quantity_units],
   };
   return db
     .query(query)
     .then((result) => result.rows)
     .catch((err) => err);
 };

  const editProductBoolean = (product_id) => {
    const query = {
     text: `UPDATE products
            SET AddedToSummary = True
            WHERE id =$1 RETURNING *;`,
            values: [product_id],
   };
   return db
     .query(query)
     .then((result) => result.rows)
     .catch((err) => err);
 };

  const deleteProduct = (id) => {
    const query = {
      text: `DELETE FROM products WHERE id = $1`,
      values: [id],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addRecipe = (recipie_name, user_id, recipe_id, imageSRC) => {
    const query = {
      text: `INSERT INTO saved_recipes (recipie_name, user_id, recipe_id ,imageSRC)
              VALUES ($1,$2, $3, $4) RETURNING *`,
      values: [recipie_name, user_id, recipe_id, imageSRC],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const deleteRecipe = (id) => {
    const query = {
      text: `DELETE FROM saved_recipes WHERE recipe_id = $1`,
      values: [id],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getOnlySummary = () => {
    const query = {
      text: `SELECT * FROM product_summary;`,
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getSummary = () => {
    const query = {
      text: `SELECT product_summary.user_id,product_id, grams_wasted, units_wasted, grams_saved, 
             units_saved , name
             FROM product_summary
             INNER JOIN products ON products.id = product_summary.product_id;`,
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserSummary = (id) => {
    const query = {
      text: `SELECT * FROM product_summary
             WHERE user_id = ${id};`,
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const EditSummary= (name, user_id, product_id,  grams_saved, units_saved) => {
  
    const query = {
      text: `UPDATE product_summary 
             SET name=$1, user_id=$2, product_id= $3, grams_saved=grams_saved + $4, units_saved = units_saved + $5
             WHERE product_id=$3 RETURNING *`,
             values: [name, user_id, product_id, grams_saved, units_saved],
    };
    return db
        .query(query)
        .then((result) => result.rows)
        .catch((err) => err);
  };


  const EditSummaryWaste= (name, user_id, id,  grams_wasted, units_wasted) => {
    const query = {
      text: `UPDATE product_summary 
             SET name=$1, user_id=$2, product_id= $3, grams_wasted=$4, units_wasted = $5
             WHERE product_id=$3 RETURNING *`,
             values: [name, user_id, id, grams_wasted, units_wasted],
    };
    return db
        .query(query)
        .then((result) => result.rows)
        .catch((err) => err);
  };


  const addSummary= (name, user_id, product_id,  grams_saved, units_saved) => {
    const query = {
      text: `INSERT INTO product_summary ( name, user_id, product_id, grams_wasted, units_wasted, grams_saved, units_saved)
             VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
             values: [name, user_id, product_id, 0, 0, 0, 0],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getPaticularUsers = (id) => {
    const query = {
      text: `SELECT * FROM users
             WHERE id = ${id};`,
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const updatescore= (id , score) => {
    const query = {
      text: `UPDATE users
             SET score= $2
             WHERE id=$1 RETURNING *`,
             values: [id,score],
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
    deleteProduct,
    addRecipe,
    deleteRecipe,
    getSummary,
    EditSummary,
    getOnlySummary,
    getPaticularUserProducts,
    getUserSavedRecipes,
    getUserSummary,
    getPaticularUsers,
    deleteProduct,
    addSummary,
    updatescore,
    editProductBoolean,
    EditSummaryWaste
  };
};
