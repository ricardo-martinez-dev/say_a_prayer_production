const utils = require("../utils/utils");
const validation = require("../utils/validation");
const activUtils = require("../utils/routes/profileActivities");

const express = require("express");
const router = express.Router();

router.get("/requests", async (req, res) => {
  try {
    const user_id = validation.validateId(req.query.user_id);
    const result = await activUtils.queryRequests(user_id);
    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/answered", async (req, res) => {
  try {
    const user_id = validation.validateId(req.query.user_id);
    const result = await activUtils.queryAnsweredRequests(user_id);
    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/posts", async (req, res) => {
  try {
    const user_id = validation.validateId(req.query.user_id);
    const result = await activUtils.queryPosts(user_id);
    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/prayers/sent", async (req, res) => {
  try {
    const user_id = validation.validateId(req.query.user_id);
    const result = await activUtils.querySentPrayers(user_id);
    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/prayers/received", async (req, res) => {
  try {
    const user_id = validation.validateId(req.query.user_id);
    const result = await activUtils.queryReceivedPrayers(user_id);
    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
