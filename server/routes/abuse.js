const utils = require("../utils/utils");
const validation = require("../utils/validation");
const abuse = require("../utils/routes/abuse");

const userModel = require("../models/user");
const hashPass = require("../utils/password");

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user_id = validation.validateId(req.body.user_id);
    const user = await userModel.User.findById(user_id);

    if (user) {
      const password = validation.validatePassword(req.body.password);
      const auth = await hashPass.unhashPassword({ password, user });

      if (auth) {
        const validatedobj = {
          user_id: validation.validateId(req.body.user_id),
          request_id: validation.validateId(req.body.request_id),
        };

        await abuse.query(validatedobj);
        res.status(200).end("Success");
      }
    }
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
