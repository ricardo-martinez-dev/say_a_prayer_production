const themesModel = require("../models/theme");
const utils = require("../utils/utils");
const validation = require("../utils/validation");
const theme = require("../utils/routes/theme");

const express = require("express");
const router = express.Router();

// get all themes
router.get("/", async (req, res) => {
  try {
    const result = await themesModel.Theme.find();
    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

// get user chosen theme
router.get("/:chosenTheme", async (req, res) => {
  try {
    const chosenTheme = validation.validateString(req.params.chosenTheme);

    const result = await themesModel.Theme.find({ themeName: chosenTheme });
    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

// update user theme
router.post("/", (req, res) => {
  try {
    const validatedObj = {
      chosenTheme: validation.validateString(req.body.chosenTheme),
      user_id: validation.validateId(req.body.user_id),
      password: validation.validatePassword(req.body.password),
    };

    theme.query(validatedObj);
    res.status(200).end("Success");
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
