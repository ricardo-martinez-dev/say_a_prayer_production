const verseModel = require("../models/verse");
const utils = require("../utils/utils");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await verseModel.Verse.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
