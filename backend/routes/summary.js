const express = require("express");
const router = express.Router();

module.exports = ({ EditSummary, getOnlySummary, getUserSummary }) => {
  router.get("/", (req, res) => {
    getOnlySummary()
      .then((summary) => {
        res.json(summary);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/:id", (req, res) => {
    getUserSummary(req.params.id)
      .then((summary) => {
        res.json(summary);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.put("/", (req, res) => {
    console.log('fffffffffffffffffffffffff')
    const {
      name,
      user_id,
      product_id,
      quantity_grams,
      quantity_units
    } = req.body;

    let  grams_saved= quantity_grams || 0;
    let  units_saved= quantity_units || 0;
    console.log( name,
      user_id,
      product_id,
      grams_saved,
      units_saved);
    EditSummary(
      name,
      user_id,
      product_id,
      grams_saved,
      units_saved 
    )
      .then((result) => {
        res.status(200).send("Posted Summary");
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
