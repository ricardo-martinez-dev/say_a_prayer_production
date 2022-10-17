const pst = require("../../models/post");
const usr = require("../../models/user");
const tags = require("../../models/tags");
const lov = require("../../models/love");
const utils = require("../utils");
const LovePost = require("../../classes/Love");
const userModel = require("../../models/user");
const hashPass = require("../password");

const updatePostStatus = async (elem) => {
  try {
    const { post_id, status } = elem;
    await pst.Post.findByIdAndUpdate(post_id, { status });
  } catch (error) {
    utils.logError(error);
  }
};

const getPost = async (obj) => {
  const { user_id, post_id } = obj;
  try {
    const post = await pst.Post.findById(post_id);
    const isLiked = await lov.Love.find({
      target_id: post_id,
      from_user: user_id,
    });
    const user = await usr.User.findById(post.user_id);

    const { fname, lname, pic, _id } = user;

    const likedPost = {
      tags: post.tags,
      status: post.status,
      abuse: post.abuse,
      isPost: post.isPost,
      createdAt: post.createdAt,
      _id: post._id,
      title: post.title,
      description: post.description,
      user_id: post.user_id,
      pic: post.pic,
      date: post.date,
      isLiked: isLiked.length > 0 ? true : false,
    };

    return {
      post: likedPost,
      user: {
        fname,
        lname,
        pic,
        user_id: _id,
      },
    };
  } catch (error) {
    utils.logError(error);
  }
};

const handleLove = async (obj) => {
  const love = new LovePost(obj);
  return await love.handleLove();
};

const getPublishedPosts = async (user_id) => {
  try {
    const post = await pst.Post.find({
      user_id,
      status: "published",
    }).sort({
      _id: -1,
    });

    const user = await usr.User.findById(user_id);
    const { fname, lname, pic, _id } = user;

    return {
      post,
      user: {
        fname,
        lname,
        pic,
        user_id: _id,
      },
    };
  } catch (error) {
    utils.logError(error);
  }
};

const getDeletedPosts = async (user_id) => {
  try {
    const post = await pst.Post.find({
      user_id,
      status: "deleted",
    }).sort({
      _id: -1,
    });

    const user = await usr.User.findById(user_id);
    const { fname, lname, pic, _id } = user;

    return {
      post,
      user: {
        fname,
        lname,
        pic,
        user_id: _id,
      },
    };
  } catch (error) {
    utils.logError(error);
  }
};

const updateTags = async (obj) => {
  try {
    obj.tags.forEach(async (tag) => {
      // ----------- DELETED CODE HERE ----------- //
      // ----------- DELETED CODE HERE ----------- //
      // ----------- DELETED CODE HERE ----------- //
    });

    return;
  } catch (error) {
    utils.logError(error);
  }
};

const sendPost = async ({ validatedObj, password }) => {
  try {
    const { user_id } = validatedObj;
    const user = await userModel.User.findById(user_id);

    if (user) {
      const auth = await hashPass.unhashPassword({ password, user });

      if (!auth) return;

      const post = new pst.Post(validatedObj);
      await post.save((err) => {
        if (err) {
          utils.logError({
            message: err.message ? err.message : null,
            error: err,
          });
        }

        updateTags({ tags: post.tags });
      });
    }

    return;
  } catch (error) {
    utils.logError(error);
    throw error;
  }
};

module.exports = {
  updatePostStatus,
  getPost,
  handleLove,
  getPublishedPosts,
  getDeletedPosts,
  sendPost,
};
