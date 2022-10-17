const utils = require("../utils/utils");
const validation = require("../utils/validation");
const lastPub = require("../utils/routes/lastPublications");

const express = require("express");
const router = express.Router();

router.get(`/requests/sent/:userId`, async (req, res) => {
  try {
    const userId = validation.validateId(req.params.userId);
    const result = await lastPub.getLastSentRequests(userId);
    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.get(`/requests/answered/:userId`, async (req, res) => {
  try {
    const userId = validation.validateId(req.params.userId);
    const result = await lastPub.getLastAnsweredRequests(userId);
    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.get(`/posts/:userId`, async (req, res) => {
  try {
    const userId = validation.validateId(req.params.userId);
    const post = await lastPub.getLastPosts(userId);
    res.status(200).send(post);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.get(`/prayers/sent/:userId`, async (req, res) => {
  try {
    const userId = validation.validateId(req.params.userId);
    const result = await lastPub.getLastSentPrayers(userId);
    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.get(`/prayers/received/:userId`, async (req, res) => {
  try {
    const userId = validation.validateId(req.params.userId);
    const result = await lastPub.getLastReceivedPrayers(userId);
    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
