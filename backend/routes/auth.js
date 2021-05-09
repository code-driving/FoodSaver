const express = require("express");
const router = express.Router();

module.exports = ({  getUserByEmail, addUser }) => {
  router.post("/register", (req, res) => {
    const {name, email, password, phone_number} = req.body
    getUserByEmail(email)
      .then((user) => {
        if (!user) {
            addUser(name, email, password, phone_number)
            .then((data) => {
                res.status(200).send('User created')
                res.json(data)
            })
        } else {
            res.status(400).send('Email already exists')
        }
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post("/login", (req, res) => {
    const {email, password} = req.body;
    getUserByEmail(email)
      .then((user) => {
        if(user && password === user.password) {
            res.json(user)
        } else{
            res.json({user:false})
        } 
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });


  return router;
};


