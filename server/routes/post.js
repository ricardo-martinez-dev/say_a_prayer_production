const utils = require("../utils/utils");
const validation = require("../utils/validation");
const postUtils = require("../utils/routes/post");
const userModel = require("../models/user");
const hashPass = require("../utils/password");

const express = require("express");
const router = express.Router();

router.post("/status", async (req, res) => {
  try {
    const user_id = validation.validateId(req.body.user_id);
    const password = validation.validatePassword(req.body.password);
    const user = await userModel.User.findById(user_id);

    if (user) {
      const auth = await hashPass.unhashPassword({ password, user });

      if (auth) {
        const validatedObj = {
          post_id: validation.validateId(req.body.post_id),
          status: validation.validateString(req.body.status),
        };

        await postUtils.updatePostStatus(validatedObj);
        res.status(200).end("Success");
      } else {
        res.status(400).end("fail");
      }
    } else {
      res.status(400).end("fail");
    }
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/post/:post_id/:user_id", async (req, res) => {
  try {
    const validatedObj = {
      post_id: validation.validateId(req.params.post_id),
      user_id: validation.validateId(req.params.user_id),
    };

    const result = await postUtils.getPost(validatedObj);
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

        const result = await postUtils.handleLove(validatedObj);
        res.status(200).send(result);
      }
    }
  } catch (error) {
    utils.logError(error);
    res.status(400).send({ status: "fail" });
  }
});

router.get("/published/:user_id", async (req, res) => {
  try {
    const user_id = validation.validateId(req.params.user_id);
    const result = await postUtils.getPublishedPosts(user_id);
    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/deleted/:user_id", async (req, res) => {
  try {
    const user_id = validation.validateId(req.params.user_id);
    const result = await postUtils.getDeletedPosts(user_id);
    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/post", (req, res) => {
  try {
    const password = validation.validatePassword(req.body.password);

    const validatedObj = {
      title: validation.validateTitle(req.body.title),
      description: validation.validatePost(req.body.description),
      user_id: validation.validateId(req.body.user_id),
      tags: validation.validateTags(req.body.tags),
      createdAt: validation.validateTimeStamp(req.body.createdAt),
      pic: validation.validateLongString(req.body.pic),
      tags: validation.validateTags(req.body.tags),
    };

    postUtils.sendPost({ validatedObj, password });
    res.status(200).end("Success");
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
