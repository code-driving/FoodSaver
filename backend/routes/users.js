const express = require("express");
const router = express.Router();


module.exports = ({ getUsers, getUserByEmail, addUser ,  getPaticularUsers , updatescore}) => {
  /* GET users listing. */
  // login route gives user if exist
  router.get("/", (req, res) => {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/:id", (req, res) => {
    getPaticularUsers(req.params.id)
      .then((user) => res.json(user))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  //register route
  router.post("/", (req, res) => {
    const { name, email, password, phone_number } = req.body;

    getUserByEmail(email)
      .then((user) => {
        if (user) {
          res.json({
            msg: "Sorry, a user account with this email already exists",
          });
        } else {
          return addUser(name, email, password, phone_number);
        }
      })
      .then((newUser) => res.json(newUser))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.put("/", (req, res) => {
    const { user_id , score  } = req.body;
    updatescore(user_id , score)
      .then((user) => res.json(user))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
