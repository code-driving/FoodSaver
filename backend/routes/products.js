const express = require("express");
const { set } = require("../app");
const router = express.Router();
const { getProductsByUsers, AppendRecipes, AppendSummary } = require("../helpers/dataHelpers");

module.exports = ({ getUserProducts,  getSavedRecipes, postProduct, editProduct, getSummary}) => {
  router.get("/", (req, res) => {
    getUserProducts()
      .then((usersProducts) => {
        const formattedProducts = getProductsByUsers(usersProducts);
        getSavedRecipes()
           .then((savedRecipe)=>{
            const combinedData = AppendRecipes(savedRecipe,formattedProducts)
            // res.json(combinedData)
            getSummary()
            .then((Summary)=>{
              const finalCombinedData = AppendSummary(Summary,combinedData)
               res.json(finalCombinedData)
             })
           })
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post("/", (req, res) => {
    const {name, expiration_date, user_id, quantity_grams, quantity_units} = req.body;
       postProduct(name, expiration_date, user_id, quantity_grams, quantity_units)
      .then((data) => {
        res.status(200).send('Posted')
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.put("/:id", (req, res) => {
    const product_id = Number(req.params.id) 
    console.log(product_id)
    const {name, expiration_date, quantity_grams, quantity_units} = req.body;
      editProduct(name, expiration_date, product_id, quantity_grams, quantity_units)
      .then((data) => {
        res.status(200).send('Edited')
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });


  return router;
};


