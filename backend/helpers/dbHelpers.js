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

  const Summary = () => {
    const query = {
      text: `SELECT * FROM quantities;`,
    };
    return db
        .query(query)
        .then((result) => result.rows)
        .catch((err) => err);
  };


  



  // const postUserProducts = (name, expiration_date, user_id) => {
  //   const query = {
  //     text: `INSERT INTO products (name, expiration_date, user_id) VALUES ($1, $2, $3) RETURNING *`,
  //     values: [name, expiration_date, user_id],
  //   };

  //   return db
  //       .query(query)
  //       .then((result) => result.rows)
  //       .catch((err) => err);
  // };



  return {
    getUsers,
    getUserByEmail,
    addUser,
    getUserProducts,
    getSavedRecipes,
    Summary
  };
};
