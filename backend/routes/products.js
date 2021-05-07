const express = require("express");
const router = express.Router();
const { getProductsByUsers } = require("../helpers/dataHelpers");

module.exports = ({ getUserProducts }) => {
  router.get("/", (req, res) => {
    getUserProducts()
      .then((usersProducts) => {
        const formattedProducts = getProductsByUsers(usersProducts);
        res.json(formattedProducts);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
