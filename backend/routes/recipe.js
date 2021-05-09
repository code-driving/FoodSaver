const express = require("express");
const router = express.Router();
const { getProductsByUsers } = require("../helpers/dataHelpers");

module.exports = ({ getSavedRecipes }) => {
  router.get("/", (req, res) => {
    getSavedRecipes()
      .then((usersRecipies) => {
        console.log('aaa')
        console.log(usersRecipies)
        res.json(usersRecipies)
        // const formattedProducts = getProductsByUsers(usersProducts);
        // res.json(formattedProducts);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });


  return router;
};


