const prayer = require("../../models/prayers");
const post = require("../../models/post");
const request = require("../../models/request");
const utils = require("../utils");

const queryPrayer = async (obj) => {
  try {
    const { target_id, user_id } = obj;
    const elem = await prayer.Prayers.findById(target_id);
    const abuse = elem.abuse.filter((el) => el !== user_id);

    return await prayer.Prayers.findByIdAndUpdate(target_id, { abuse });
  } catch (error) {
    utils.logError(error);
  }
};

const queryPost = async (obj) => {
  try {
    const { target_id, user_id } = obj;
    const elem = await post.Post.findById(target_id);
    const abuse = elem.abuse.filter((el) => el !== user_id);

    return await post.Post.findByIdAndUpdate(target_id, { abuse });
  } catch (error) {
    utils.logError(error);
  }
};

const queryRequest = async (obj) => {
  try {
    const { target_id, user_id } = obj;
    const elem = await request.Request.findById(target_id);
    const abuse = elem.abuse.filter((el) => el !== user_id);

    return await request.Request.findByIdAndUpdate(target_id, { abuse });
  } catch (error) {
    utils.logError(error);
  }
};

const fetchPostReports = async (elem) => {
  try {
    let posts = await post.Post.find({ abuse: { $in: elem } });
    return posts.map((post) => {
      const { _id, title, description, user_id, date } = post;

      return {
        _id,
        title,
        description: `${description.slice(0, 100)}...`,
        user_id,
        date,
        target: "post",
      };
    });
  } catch (error) {
    utils.logError(error);
  }
};

const getPrayerTitle = (obj) => {
  const { titles, request_id } = obj;

  for (let i in titles) {
    if (titles[i]["_id"] == request_id) return titles[i]["title"];
  }
};

const fetchPrayerReports = async (elem) => {
  try {
    const prayers = await prayer.Prayers.find({ abuse: { $in: elem } });
    const ids = prayers.map((p) => p.request_id);
    const titles = await request.Request.find(
      { _id: { $in: ids } },
      "title _id"
    );

    let obj = [];

    prayers.forEach((p) => {
      // ----------- DELETED CODE HERE ----------- //
      // ----------- DELETED CODE HERE ----------- //
      // ----------- DELETED CODE HERE ----------- //
    });

    return obj;
  } catch (error) {
    utils.logError(error);
  }
};

const fetchRequestReports = async (elem) => {
  try {
    let requests = await request.Request.find({ abuse: { $in: elem } });

    return requests.map((request) => {
      const { _id, title, description, user_id, date } = request;

      return {
        _id,
        title,
        description: `${description.slice(0, 100)}...`,
        user_id,
        date,
        target: "request",
      };
    });
  } catch (error) {
    utils.logError(error);
  }
};

const merge = (obj) => {
  let temp = [];

  for (let i in obj.requests) temp.push(obj.requests[i]);
  for (let i in obj.posts) temp.push(obj.posts[i]);
  for (let i in obj.prayers) temp.push(obj.prayers[i]);

  return temp;
};

const sortByDate = (obj) => {
  return obj.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
};

const query = async (user_id) => {
  try {
    const requests = await fetchRequestReports(user_id);
    const posts = await fetchPostReports(user_id);
    const prayers = await fetchPrayerReports(user_id);
    const merged = merge({ requests, posts, prayers });
    const result = sortByDate(merged);

    return result;
  } catch (error) {
    utils.logError(error);
  }
};

module.exports = { queryRequest, queryPrayer, queryPost, query };
