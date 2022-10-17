const utils = require("../utils/utils");
const validation = require("../utils/validation");
const usr = require("../models/user");

const express = require("express");
const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const user_id = validation.validateId(req.query.user_id);
    const members = await usr.User.find(
      { _id: { $ne: user_id } },
      "_id fname lname religion country"
    );

    res.status(200).send(members);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
