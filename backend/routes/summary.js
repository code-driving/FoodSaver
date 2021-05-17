const express = require("express");
const router = express.Router();

module.exports = ({ EditSummary, getOnlySummary, getUserSummary ,addSummary, EditSummaryWaste}) => {
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
    const {
      name,
      user_id,
      product_id,
      quantity_grams,
      quantity_units
    } = req.body;
    let  grams_saved= quantity_grams || 0;
    let  units_saved= quantity_units || 0;
    EditSummary(
      name,
      user_id,
      product_id,
      grams_saved,
      units_saved 
    )
      .then((result) => {
        res.json(result);
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
      user_id,
      product_id,
    } = req.body;

    addSummary(
      name,
      user_id,
      product_id,
    )
      .then((result) => {
        res.json(result);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.put("/waste", (req, res) => {
    const {
      name,
      user_id,
      id,
      grams_wasted, 
      units_wasted
    } = req.body;
    EditSummaryWaste(
      name,
      user_id,
      id,
      grams_wasted,
      units_wasted 
    )
      .then((result) => {
        res.json(result);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });


  return router;
};
