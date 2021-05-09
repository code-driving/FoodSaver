const express = require("express");
const { set } = require("../app");
const router = express.Router();
const { getProductsByUsers, AppendRecipes } = require("../helpers/dataHelpers");

module.exports = ({ getUserProducts,  getSavedRecipes, postProduct}) => {
  router.get("/", (req, res) => {
    getUserProducts()
      .then((usersProducts) => {
        const formattedProducts = getProductsByUsers(usersProducts);
        getSavedRecipes()
           .then((savedRecipe)=>{
            const combinedData = AppendRecipes(savedRecipe,formattedProducts)
            res.json(combinedData)
           })
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post("/", (req, res) => {

    const {name, expiration_date, user_id, quantity_grams, quantity_units, 
            grams_wasted, units_wasted, grams_saved, units_saved} = req.body;
       postProduct(name, expiration_date, user_id, quantity_grams, quantity_units, grams_wasted, units_wasted, grams_saved, units_saved)
      .then((data) => {
        res.status(200).send('Posted')
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });


  return router;
};


