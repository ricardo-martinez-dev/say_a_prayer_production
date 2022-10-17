const post = require("../models/post");
const utils = require("../utils/utils");
const validation = require("../utils/validation");

const userModel = require("../models/user");
const hashPass = require("../utils/password");

const express = require("express");
const router = express.Router();

async function addReport(elem) {
  try {
    const { post_id, user_id } = elem;

    await post.Post.findByIdAndUpdate(post_id, {
      $push: { abuse: user_id },
    });
  } catch (error) {
    utils.logError(error);
    throw error;
  }
}

async function checkIfContentIsAbusive(post_id) {
  try {
    const abuseArray = await post.Post.findById(post_id);
    return abuseArray.abuse.length > 4 ? true : false;
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
}

async function setContentAsAbusive(postId) {
  // todo : set content as abusive
  try {
    const { post_id, user_id } = elem;

    await post.Post.findByIdAndUpdate(post_id, {
      status: "abusive",
    });
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
}

async function query(elem) {
  try {
    const { post_id, user_id } = elem;

    await addReport(elem);

    // check whether content is abusive
    const isAbusive = await checkIfContentIsAbusive(post_id);

    isAbusive ? setContentAsAbusive(post_id) : null;
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
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
        // validate input
        const validatedObj = {
          user_id: validation.validateId(req.body.user_id),
          post_id: validation.validateId(req.body.post_id),
        };

        await query(validatedObj);
        res.end("Success");
      }
    }
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
