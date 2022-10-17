const express = require("express");
const router = express.Router();
const utils = require("../utils/utils");
const prayerUtils = require("../utils/routes/prayers");
const NewPrayer = require("../utils/routes/newPrayer");
const validation = require("../utils/validation");
const hashPass = require("../utils/password");
const userModel = require("../models/user");

router.get("/:reqId", async (req, res) => {
  try {
    const result = await prayerUtils.getPrayers(req.params);
    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/like", async (req, res) => {
  try {
    const user_id = validation.validateId(req.body.user_id);
    const user = await userModel.User.findById(user_id);

    if (user) {
      const password = validation.validatePassword(req.body.password);
      const auth = await hashPass.unhashPassword({ password, user });

      if (auth) {
        const validatedObj = {
          targetId: validation.validateId(req.body.targetId),
          isLiked: validation.validateBoolean(req.body.isLiked),
          to_user: validation.validateId(req.body.to_user),
          from_user: validation.validateId(req.body.from_user),
          target: validation.validateString(req.body.target),
        };

        const result = await prayerUtils.handleLove(validatedObj);
        res.status(200).send(result);
      }
    }
  } catch (error) {
    utils.logError(error);
    res.status(400).send({ status: "fail" });
  }
});

router.post("/new", async (req, res) => {
  try {
    const newPrayer = new NewPrayer(req.body);
    newPrayer.init();

    res.status(200).end("Success");
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
