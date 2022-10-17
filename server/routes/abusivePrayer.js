const prayers = require("../models/prayers");
const utils = require("../utils/utils");
const rnk = require("../models/ranking");
const validation = require("../utils/validation");

const userModel = require("../models/user");
const hashPass = require("../utils/password");

const express = require("express");
const router = express.Router();

// TODO : remove prayer abuse

async function addReport(obj) {
  try {
    const { _id, user_id } = obj;
    const res = await prayers.Prayers.findByIdAndUpdate(
      _id,
      {
        $push: { abuse: user_id },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res;
  } catch (error) {
    utils.logError(error);
    throw error;
  }
}

async function updateRanking(obj) {
  try {
    await rnk.Ranking.findOneAndUpdate(
      { user_id: obj.user_id },
      {
        $inc: { sent: -1 },
      }
    );
  } catch (error) {
    utils.logError(error);
    throw error;
  }
}

router.post("/", async (req, res) => {
  try {
    const user_id = validation.validateId(req.body.user_id);
    const user = await userModel.User.findById(user_id);

    if (user) {
      const password = validation.validatePassword(req.body.password);
      const auth = await hashPass.unhashPassword({ password, user });

      if (auth) {
        const validateObj = {
          prayer_id: validation.validateId(req.body.prayer_id),
          from_user: validation.validateId(req.body.from_user),
          to_user: validation.validateId(req.body.to_user),
        };

        const { prayer_id, from_user, to_user } = validateObj;

        await addReport({ _id: prayer_id, user_id: to_user });
        await updateRanking({ user_id: from_user });

        res.end("Success");
      }
    }
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
