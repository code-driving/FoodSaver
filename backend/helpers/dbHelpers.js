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

  const addUser = (name, email, password) => {
    const query = {
      text: `INSERT INTO users (name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [name, email, password],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const getUserProducts = () => {
    const query = {
      text: `SELECT *
        FROM users
        INNER JOIN products
        ON users.id = products.user_id`,
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
  };
};
