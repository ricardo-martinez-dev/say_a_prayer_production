const utils = require("../utils/utils");
const validation = require("../utils/validation");
const reports = require("../utils/routes/reports");

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const validatedobj = {
      target_id: validation.validateId(req.body.target_id),
      target: validation.validateString(req.body.target),
      user_id: validation.validateId(req.body.user_id),
    };

    const { target_id, user_id, target } = validatedobj;

    switch (target) {
      case "post":
        await reports.queryPost({ target, target_id, user_id });
        break;
      case "request":
        await reports.queryRequest({ target, target_id, user_id });
        break;
      case "prayer":
        await reports.queryPrayer({ target, target_id, user_id });
        break;
      default:
        console.log(`Not post/request/prayer`);
    }

    res.status(200).send({ status: "success" });
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/:user_id", async (req, res) => {
  try {
    const user_id = validation.validateId(req.params.user_id);
    const result = await reports.query(user_id);

    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
