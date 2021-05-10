const express = require("express");
const router = express.Router();

module.exports = ({ addSummary }) => {

  router.post("/", (req, res) => {

    const {user_id, product_id, grams_wasted, units_wasted, grams_saved, units_saved} = req.body;
    console.log(req.body)
    addSummary(user_id, product_id, grams_wasted, units_wasted, grams_saved, units_saved)
      .then((result) => {
        res.status(200).send('Posted Summary')
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

//   router.delete("/:id", (req, res) => {
//     const id = Number(req.params.id) 
//     deleteRecipe(id)
//       .then(() => {
//         res.status(200).send('Deleted Recipe')
//       })
//       .catch((err) =>
//         res.json({
//           error: err.message,
//         })
//       );
//   });


  return router;
};


