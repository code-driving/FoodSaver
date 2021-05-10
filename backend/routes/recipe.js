const express = require("express");
const router = express.Router();

module.exports = ({ getSavedRecipes, addRecipe, deleteRecipe }) => {
  router.get("/", (req, res) => {
    getSavedRecipes()
      .then((usersRecipies) => {
        console.log(usersRecipies)
        res.json(usersRecipies)
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post("/", (req, res) => {
    const {recipie_name, user_id, recipe_id} = req.body;
    addRecipe(recipie_name, user_id, recipe_id)
      .then(() => {
        res.status(200).send('Posted Recipe')
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.delete("/:id", (req, res) => {
    const id = Number(req.params.id) 
    deleteRecipe(id)
      .then(() => {
        res.status(200).send('Deleted Recipe')
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });



  

  return router;
};


