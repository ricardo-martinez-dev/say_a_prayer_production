const utils = require("../utils/utils");
const validation = require("../utils/validation");
const membership = require("../utils/routes/membership");

const express = require("express");
const router = express.Router();

router.get("/:user_id", async (req, res) => {
  try {
    const user_id = validation.validateId(req.params.user_id);
    const result = await membership.query(user_id);
    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
