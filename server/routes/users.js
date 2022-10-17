const usr = require("../models/user");
const utils = require("../utils/utils");
const validation = require("../utils/validation");
const hashPass = require("../utils/password");

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user_id = validation.validateId(req.body.user_id);
    const password = validation.validatePassword(req.body.password);
    const user = await usr.User.findById(user_id);

    if (user) {
      const auth = await hashPass.unhashPassword({ password, user });

      if (auth) {
        // authenticated
        const result = { ...user._doc, password };
        res.status(200).send(result);
      } else {
        // not authenticated
        res.status(400).send({ status: "fail" });
      }
    }
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/:user_id", async (req, res) => {
  try {
    const user_id = validation.validateId(req.params.user_id);
    const result = await usr.User.findById(user_id);

    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await usr.User.find();

    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
