const stats = require("../models/ranking");
const utils = require("../utils/utils");
const validation = require("../utils/validation");

const express = require("express");
const router = express.Router();

router.get("/member/:user_id", async (req, res) => {
  try {
    const user_id = validation.validateId(req.params.user_id);
    const result = await await stats.Ranking.find({ user_id });
    res.status(200).send(result[0]);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
