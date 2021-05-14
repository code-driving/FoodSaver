const express = require("express");
const router = express.Router();

module.exports = ({ addSummary, getOnlySummary, getUserSummary }) => {
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

  router.post("/", (req, res) => {
    const {
      user_id,
      product_id,
      grams_wasted,
      units_wasted,
      grams_saved,
      units_saved,
    } = req.body;
    console.log(req.body);
    addSummary(
      user_id,
      product_id,
      grams_wasted,
      units_wasted,
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
