const utils = require("../utils");
const book = require("../../models/bookmarks");
const post = require("../../models/post");

const unsavePost = async (obj) => {
  try {
    const res = await book.Bookmarks.findOneAndDelete(obj);
    return res;
  } catch (error) {
    utils.logError(error);
  }
};

const savePost = async (obj) => {
  try {
    let query = obj;
    let update = obj;
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };

    return await book.Bookmarks.findOneAndUpdate(
      query,
      update,
      options,
      (error, result) => {
        if (error) {
          utils.logError(error);
        }
      }
    );
  } catch (error) {
    utils.logError(error);
  }
};

const fetchBookmarks = async (user_id) => {
  try {
    return await book.Bookmarks.find({ user_id });
  } catch (error) {
    utils.logError(error);
  }
  return user_id;
};

const fetchPosts = async (bookmarks) => {
  try {
    const ids = bookmarks.map((el) => el.post_id);
    return await post.Post.find({
      _id: {
        $in: ids,
      },
      status: "published",
    });
  } catch (error) {
    utils.logError(error);
  }
};

const queryPostBookmark = async (obj) => {
  try {
    const res = await book.Bookmarks.find(obj);
    return res.length > 0 ? true : false;
  } catch (error) {
    utils.logError(error);
  }
};

module.exports = {
  unsavePost,
  savePost,
  fetchBookmarks,
  fetchPosts,
  queryPostBookmark,
};
