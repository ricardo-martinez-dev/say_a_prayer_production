const utils = require("../utils/utils");
const validation = require("../utils/validation");
const notify = require("../models/notifications");
const hashPass = require("../utils/password");
const userModel = require("../models/user");

const express = require("express");
const router = express.Router();

const NotPrayers = require("../classes/NotPrayers");
const NotFriendships = require("../classes/NotFriendships");

router.post("/ring", async (req, res) => {
  try {
    const user_id = validation.validateId(req.body.user_id);
    const user = await userModel.User.findById(user_id);

    if (user) {
      const password = validation.validatePassword(req.body.password);
      const auth = await hashPass.unhashPassword({ password, user });

      if (auth) {
        // ----------- DELETED CODE HERE ----------- //
        // ----------- DELETED CODE HERE ----------- //
        // ----------- DELETED CODE HERE ----------- //
      }
    }
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/unring", async (req, res) => {
  try {
    const user_id = validation.validateId(req.body.user_id);
    const user = await userModel.User.findById(user_id);

    if (user) {
      const password = validation.validatePassword(req.body.password);
      const auth = await hashPass.unhashPassword({ password, user });

      if (auth) {
        // ----------- DELETED CODE HERE ----------- //
        // ----------- DELETED CODE HERE ----------- //
        // ----------- DELETED CODE HERE ----------- //
      }
    }
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/clear/:user_id", async (req, res) => {
  try {
    const user_id = validation.validateId(req.params.user_id);
    const ress = await notify.Notifications.findOneAndUpdate(
      { user_id },
      { hasNotification: false }
    );
    const result = ress ? true : false;

    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/fetch", async (req, res) => {
  try {
    const user_id = validation.validateId(req.body.user_id);
    const user = await userModel.User.findById(user_id);

    if (user) {
      const password = validation.validatePassword(req.body.password);
      const auth = await hashPass.unhashPassword({ password, user });

      if (auth) {
        // ----------- DELETED CODE HERE ----------- //
        // ----------- DELETED CODE HERE ----------- //
        // ----------- DELETED CODE HERE ----------- //
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
    const ress = await notify.Notifications.find({ user_id });
    const result = ress[0].hasNotification ? true : false;

    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
