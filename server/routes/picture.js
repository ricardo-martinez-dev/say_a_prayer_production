const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const avatarModel = require("../models/avatar");
const validation = require("../utils/validation");
const hassPass = require("../utils/password");

router.get("/", async (req, res) => {
  const { user_id } = req.query;
  const result = await avatarModel.Avatar.find({ user_id });

  res.json(result[0].avatar);
});

router.post("/", async (req, res) => {
  const { avatar } = req.body;
  const password = validation.validatePassword(req.body.password);
  const user_id = validation.validateId(req.body.user_id);
  const user = await userModel.User.findOne({ _id: user_id });

  if (user) {
    const auth = await hassPass.unhashPassword({ password, user });

    if (!auth) {
      res.end("Fail");
      return;
    }
  } else {
    res.end("Fail");
    return;
  }

  const query = { user_id };
  const update = { user_id, avatar };
  const options = { upsert: true };

  const result = await avatarModel.Avatar.findOneAndUpdate(
    query,
    update,
    options,
    function (error, result) {
      if (error) console.log(error);
      else return result;
    }
  );

  res.json(result);
});

module.exports = router;
