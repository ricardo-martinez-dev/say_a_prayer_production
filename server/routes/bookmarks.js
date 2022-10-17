const utils = require("../utils/utils");
const validation = require("../utils/validation");
const bookmark = require("../utils/routes/bookmarks");

const userModel = require("../models/user");
const hashPass = require("../utils/password");

const express = require("express");
const router = express.Router();

router.post("/saved", async (req, res) => {
  try {
    // validate object
    const validatedObj = {
      user_id: validation.validateId(req.body.user_id),
      post_id: validation.validateId(req.body.post_id),
    };

    const user = await userModel.User.findById(validatedObj.user_id);

    if (user) {
      const password = validation.validatePassword(req.body.password);
      const auth = await hashPass.unhashPassword({ password, user });

      if (auth) {
        const result = await bookmark.queryPostBookmark(validatedObj);
        res.status(200).send(result);
      }
    }
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const user_id = validation.validateId(req.body.user_id);
    const user = await userModel.User.findById(user_id);

    if (user) {
      const password = validation.validatePassword(req.body.password);
      const auth = await hashPass.unhashPassword({ password, user });

      if (auth) {
        const bookmarks = await bookmark.fetchBookmarks(user_id);
        const posts = await bookmark.fetchPosts(bookmarks);
        res.status(200).send(posts);
      } else res.status(200).send([]);
    } else res.status(200).send([]);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/manage", async (req, res) => {
  try {
    const user_id = validation.validateId(req.body.user_id);
    const user = await userModel.User.findById(user_id);

    if (user) {
      const password = validation.validatePassword(req.body.password);
      const auth = await hashPass.unhashPassword({ password, user });

      if (auth) {
        // validate object
        const validatedObj = {
          user_id: validation.validateId(req.body.user_id),
          post_id: validation.validateId(req.body.post_id),
        };

        const result = await bookmark.savePost(validatedObj);
        res.status(200).send("Success");
      }
    }
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.delete("/manage", async (req, res) => {
  try {
    const user_id = validation.validateId(req.body.user_id);
    const user = await userModel.User.findById(user_id);

    if (user) {
      const password = validation.validatePassword(req.body.password);
      const auth = await hashPass.unhashPassword({ password, user });

      if (auth) {
        // validate object
        const validatedObj = {
          user_id: validation.validateId(req.body.user_id),
          post_id: validation.validateId(req.body.post_id),
        };

        await bookmark.unsavePost(validatedObj);
        res.status(200).send("Success");
      }
    }
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
