const express = require("express");
const router = express.Router();

module.exports = ({
  getSavedRecipes,
  addRecipe,
  deleteRecipe,
  getUserSavedRecipes,
}) => {
  router.get("/", (req, res) => {
    getSavedRecipes()
      .then((usersRecipies) => {
        console.log(usersRecipies);
        res.json(usersRecipies);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/:id", (req, res) => {
    getUserSavedRecipes(req.params.id)
      .then((usersRecipies) => {
        console.log(usersRecipies);
        res.json(usersRecipies);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post("/", (req, res) => {
    const { recipie_name, user_id, recipe_id , imageSRC} = req.body;
    addRecipe(recipie_name, user_id, recipe_id,imageSRC)
      .then((data1) => {
        res.json(data1);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    console.log("id from route", id)
    deleteRecipe(id)
      .then((data) => {
        console.log("data from route", data)
        res.json(data)
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
