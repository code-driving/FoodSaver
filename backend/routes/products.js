const express = require("express");
const { set } = require("../app");
const router = express.Router();
const {
  getProductsByUsers,
  AppendRecipes,
  AppendSummary,
} = require("../helpers/dataHelpers");

module.exports = ({
  getUserProducts,
  getSavedRecipes,
  postProduct,
  editProduct,
  getSummary,
  getPaticularUserProducts,
}) => {
  router.get("/", (req, res) => {
    getUserProducts()
      .then((usersProducts) => {
        res.json(usersProducts);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    console.log(id);
    getPaticularUserProducts(id)
      .then((userProducts) => {
        res.json(userProducts);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/all", (req, res) => {
    getUserProducts()
      .then((usersProducts) => {
        console.log(usersProducts);
        const formattedProducts = getProductsByUsers(usersProducts);
        getSavedRecipes().then((savedRecipe) => {
          const combinedData = AppendRecipes(savedRecipe, formattedProducts);
          // res.json(combinedData)
          getSummary().then((Summary) => {
            const finalCombinedData = AppendSummary(Summary, combinedData);
            res.json(finalCombinedData);
          });
        });
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post("/", (req, res) => {
    const {
      name,
      expiration_date,
      user_id,
      quantity_grams,
      quantity_units,
    } = req.body;
    postProduct(name, expiration_date, user_id, quantity_grams, quantity_units)
      .then((data) => {
        res.json(data[0]);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.put("/:id", (req, res) => {
    const product_id = Number(req.params.id);
    console.log(product_id);
    const { name, expiration_date, quantity_grams, quantity_units } = req.body;
    editProduct(
      name,
      expiration_date,
      product_id,
      quantity_grams,
      quantity_units
    )
      .then((data) => {
        console.log("data from route", data)
        res.json(data);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
