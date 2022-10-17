const utils = require("../utils/utils");
const validation = require("../utils/validation");
const hashPass = require("../utils/password");
const friendship = require("../utils/routes/friendship");

const usr = require("../models/user");

const express = require("express");
const router = express.Router();

router.post("/status", async (req, res) => {
  try {
    const user_id = validation.validateId(req.body.user_id);
    const communityMember = validation.validateId(req.body.communityMember);

    const user = await usr.User.findById(user_id);

    if (user) {
      const password = validation.validatePassword(req.body.password);
      const auth = await hashPass.unhashPassword({ password, user });

      if (auth) {
        const obj = {
          user_id,
          communityMember,
        };

        const result = await friendship.queryFriendshipStatus(obj);
        res.status(200).send(result);
      }
    }
  } catch (error) {
    utils.logError(error);
  }
});

router.post("/update", async (req, res) => {
  try {
    const validatdObj = {
      user_id: validation.validateId(req.body.user_id),
      password: validation.validatePassword(req.body.password),
      communityMember: validation.validateId(req.body.communityMember),
      event: validation.validateShortString(req.body.event),
    };

    const user = await usr.User.findById(validatdObj.user_id);

    if (user) {
      const password = validatdObj.password;
      const auth = await hashPass.unhashPassword({ password, user });

      if (auth) {
        const result = await friendship.updateFriendshipStatus(validatdObj);
        res.status(200).send(result);
      }
    }
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
