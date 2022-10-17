const utils = require("../utils/utils");
const validation = require("../utils/validation");
const reqModel = require("../models/request");
const requ = require("../utils/routes/requests");
const userModel = require("../models/user");
const hashPass = require("../utils/password");

const express = require("express");
const router = express.Router();

router.post("/status", async (req, res) => {
  try {
    const validatedobj = {
      status: validation.validateString(req.body.status),
      request_id: validation.validateId(req.body.request_id),
    };

    await requ.updateStatus(validatedobj);
    res.status(200).end("Success");
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/community/:user_id/:page", async (req, res) => {
  try {
    const page = validation.validateString(req.params.page);
    const user_id = validation.validateId(req.params.user_id);

    const obj = {
      page,
      user_id,
      status: "requested",
    };

    const result = await requ.getCommunityRequests(obj);

    res.status(200).send(result);
  } catch (error) {
    utils.logError({
      message: err.message ? err.message : null,
      error: err,
    });
    res.status(400).json({ error: error.message });
  }
});

router.get("/community/answered/:user_id/:page", async (req, res) => {
  try {
    const page = validation.validateString(req.params.page);
    const user_id = validation.validateId(req.params.user_id);

    const obj = {
      page,
      user_id,
      status: "answered",
    };

    const result = await requ.getCommunityRequests(obj);

    res.status(200).send(result);
  } catch (error) {
    utils.logError({
      message: err.message ? err.message : null,
      error: err,
    });
    res.status(400).json({ error: error.message });
  }
});

router.get("/explore/:page", async (req, res) => {
  try {
    const page = validation.validateString(req.params.page);
    const result = await requ.getExploreRequests(page);

    res.status(200).send(result);
  } catch (error) {
    utils.logError({
      message: err.message ? err.message : null,
      error: err,
    });
    res.status(400).json({ error: error.message });
  }
});

router.get("/:request_id", async (req, res) => {
  try {
    const request_id = validation.validateId(req.params.request_id);
    const result = await reqModel.Request.findById(request_id);

    res.status(200).send(result);
  } catch (error) {
    utils.logError({
      message: err.message ? err.message : null,
      error: err,
    });
    res.status(400).json({ error: error.message });
  }
});

router.post("/answered", async (req, res) => {
  try {
    const user_id = validation.validateId(req.body.user_id);
    const password = validation.validatePassword(req.body.password);

    const user = await userModel.User.findById(user_id);

    if (user) {
      const auth = await hashPass.unhashPassword({ password, user });

      if (auth) {
        const obj = {
          user_id,
          status: "answered",
        };

        const result = await requ.getRequests(obj);
        res.status(200).send(result);
      } else {
        res.status(200).send([]);
      }
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
    utils.logError({
      message: err.message ? err.message : null,
      error: err,
    });
    res.status(400).json({ error: error.message });
  }
});

router.post("/user/deleted", async (req, res) => {
  try {
    const user_id = validation.validateId(req.body.user_id);
    const password = validation.validatePassword(req.body.password);

    const user = await userModel.User.findById(user_id);

    if (user) {
      const auth = await hashPass.unhashPassword({ password, user });

      if (auth) {
        const result = await requ.getDeletedRequests(user_id);
        res.status(200).send(result);
      } else {
        res.status(200).send([]);
      }
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
    utils.logError({
      message: err.message ? err.message : null,
      error: err,
    });
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const password = validation.validatePassword(req.body.password);
    const validatedobj = {
      title: validation.validateTitle(req.body.title),
      description: validation.validateRequest(req.body.description),
      user_id: validation.validateId(req.body.user_id),
      tags: validation.validateTags(req.body.tags),
      pic: validation.validateLongString(req.body.pic),
      createdAt: validation.validateTimeStamp(req.body.createdAt),
    };

    const user = await userModel.User.findById(validatedobj.user_id);

    if (user) {
      const auth = await hashPass.unhashPassword({ password, user });

      if (!auth) return;

      const result = await requ.createRequest(validatedobj);
      await requ.updateTags({ tags: validatedobj.tags });

      res.status(200).json({ result });
    }
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/user/requested", async (req, res) => {
  try {
    const user_id = validation.validateId(req.body.user_id);
    const password = validation.validatePassword(req.body.password);

    const user = await userModel.User.findById(user_id);

    if (user) {
      const auth = await hashPass.unhashPassword({ password, user });

      if (auth) {
        const obj = {
          user_id,
          status: "requested",
        };

        const result = await requ.getRequests(obj);
        res.status(200).send(result);
      } else {
        res.status(200).send([]);
      }
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
