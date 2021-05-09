const express = require("express");
const router = express.Router();
const { getProductsByUsers, AppendRecipes } = require("../helpers/dataHelpers");

module.exports = ({ getUserProducts,  getSavedRecipes }) => {
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

  // router.post("/", (req, res) => {
  //   getUserProducts()
  //     .then((usersProducts) => {
  //       const formattedProducts = getProductsByUsers(usersProducts);
  //       res.json(formattedProducts);
  //     })
  //     .catch((err) =>
  //       res.json({
  //         error: err.message,
  //       })
  //     );
  // });


  return router;
};


