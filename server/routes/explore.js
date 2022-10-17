const req = require("../models/request");
const post = require("../models/post");
const utils = require("../utils/utils");

const express = require("express");
const router = express.Router();

function sortByKey(array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x > y ? -1 : x < y ? 1 : 0;
  });
}

async function queryRequests() {
  try {
    return await req.Request.find({
      status: { $not: { $eq: "deleted" } },
    }).sort({
      _id: -1,
    });
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
}

async function queryPosts() {
  try {
    return await post.Post.find({
      status: { $not: { $eq: "deleted" } },
    }).sort({
      _id: -1,
    });
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
}

async function queryContents() {
  try {
    let res = await queryRequests();
    const foo = await queryPosts();

    Array.prototype.push.apply(res, foo);

    return sortByKey(res, "_id");
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
}

router.get("/", async (req, res) => {
  try {
    const result = await queryContents();
    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
