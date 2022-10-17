const utils = require("../utils/utils");
const userInfo = require("../utils/routes/userInfo");
const validation = require("../utils/validation");
const hashPass = require("../utils/password");
const userModel = require("../models/user");

const express = require("express");
const router = express.Router();

router.post("/settings/update", async (req, res) => {
  try {
    const user_id = validation.validateId(req.body.update.user_id);
    const user = await userModel.User.findById(user_id);

    if (user) {
      const password = validation.validatePassword(req.body.password);
      const auth = await hashPass.unhashPassword({ password, user });

      if (auth) {
        const result = await userInfo.query(req.body.update);

        const test =
          process.env.RECRUTER_ID === user_id &&
          process.env.RECRUTER_PASS !== result.password;

        if (test) {
          // unauthorized password change
          res.status(400).json({ status: "fail", result });
        } else {
          // password changed
          res.status(200).json({ status: "success", result });
        }
      }
    }
  } catch (error) {
    utils.logError(error);
  }
});

module.exports = router;
