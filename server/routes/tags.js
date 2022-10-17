const tags = require("../models/tags");
const utils = require("../utils/utils");

const express = require("express");
const router = express.Router();

router.get("/common", async (req, res) => {
  try {
    const result = await tags.Tags.find({}, "-__v -_id")
      .limit(4)
      .sort({ counter: -1 });

    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
