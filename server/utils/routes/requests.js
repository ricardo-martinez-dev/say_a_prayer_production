const reqModel = require("../../models/request");
const utils = require("../utils");
const tagsModel = require("../../models/tags");
const postModel = require("../../models/post");
const userModel = require("../../models/user");
const hashPass = require("../password");

const createRequest = async (obj) => {
  const request = new reqModel.Request(obj);
  return await request.save(async (err) => {
    if (err) {
      utils.logError({
        message: err.message ? err.message : null,
        error: err,
      });
      return false;
    }
  });
};

const getRequests = async (obj) => {
  return await reqModel.Request.find(obj).sort({
    _id: -1,
  });
};

const getExploreRequests = async (page) => {
  let limit = 3;
  let totalToSkip = (page - 1) * limit;
  const requests = await reqModel.Request.find()
    .or([
      {
        status: "requested",
      },
      {
        status: "answered",
      },
    ])
    .limit(limit)
    .skip(totalToSkip)
    .sort({ createdAt: -1 });

  const posts = await postModel.Post.find({ status: "published" })
    .limit(limit)
    .skip(totalToSkip)
    .sort({ createdAt: -1 });

  return requests.concat(posts);
};

const getDeletedRequests = async (user_id) => {
  return await reqModel.Request.find({ user_id, status: "deleted" }).sort({
    _id: -1,
  });
};

const getCommunityRequests = async ({ user_id, page, status }) => {
  let limit = 8;
  let totalToSkip = (page - 1) * limit;

  const requests = await reqModel.Request.find({
    status,
    abuse: { $nin: user_id },
    user_id: { $ne: user_id },
  })
    .limit(limit)
    .skip(totalToSkip)
    .sort({ createdAt: -1 });

  return requests;
};

const updateTags = async (obj) => {
  obj.tags.forEach(async (tag) => {
    try {
      return await tagsModel.Tags.findOneAndUpdate(
        { tag: tag },
        { $inc: { counter: 1 } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    } catch (error) {
      utils.logError({
        message: error.message ? error.message : null,
        error: error,
      });
      throw error;
    }
  });
};

module.exports = {
  createRequest,
  getRequests,
  getExploreRequests,
  getDeletedRequests,
  getCommunityRequests,
  updateTags,
};
