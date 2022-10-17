const utils = require("../utils/utils");
const validation = require("../utils/validation");
const sett = require("../models/accountSettings");

const express = require("express");
const router = express.Router();

router.get("/:user_id", async (req, res) => {
  try {
    // ----------- DELETED CODE HERE ----------- //
    // ----------- DELETED CODE HERE ----------- //
    // ----------- DELETED CODE HERE ----------- //

    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
