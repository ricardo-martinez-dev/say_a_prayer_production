const req = require("../../models/request");
const posts = require("../../models/post");
const prayer = require("../../models/prayers");
const utils = require("../utils");

const queryReceivedPrayers = async (user_id) => {
  try {
    let listOfPrayers = await prayer.Prayers.find({
      to_user: user_id,
    })
      .sort({
        _id: -1,
      })
      .limit(4);

    const prayersIds = listOfPrayers.map((obj) => obj.request_id);

    const listOfRequets = await req.Request.find({
      _id: { $in: prayersIds },
    });

    const res = [];

    for (const i in listOfPrayers) {
      for (const j in listOfRequets) {
        // request_id in prayer
        const one = listOfPrayers[i]["request_id"].toString();
        // request's _id
        const two = listOfRequets[j]["_id"].toString();

        if (one === two) {
          const temp = {
            date: listOfPrayers[i]["date"],
            from_user: listOfPrayers[i]["from_user"],
            to_user: listOfPrayers[i]["to_user"],
            request_id: listOfPrayers[i]["request_id"],
            _id: listOfPrayers[i]["_id"],
            prayer: listOfPrayers[i]["prayer"],
            tags: listOfRequets[j]["tags"],
            title: listOfRequets[j]["title"],
          };

          res.push(temp);
        }
      }
    }

    return res;
  } catch (error) {
    utils.logError(error);
  }
};

const querySentPrayers = async (user_id) => {
  try {
    const res = await prayer.Prayers.find({
      from_user: user_id,
    })
      .sort({
        _id: -1,
      })
      .limit(4);

    return res;
  } catch (error) {
    utils.logError(error);
  }
};

const queryPosts = async (user_id) => {
  try {
    return await posts.Post.find({
      user_id,
      status: "published",
    })
      .sort({
        _id: -1,
      })
      .limit(4);
  } catch (error) {
    utils.logError(error);
  }
};

const queryAnsweredRequests = async (user_id) => {
  try {
    return await req.Request.find({
      user_id,
      status: "answered",
    })
      .sort({
        _id: -1,
      })
      .limit(4);
  } catch (error) {
    utils.logError(error);
  }
};

const queryRequests = async (user_id) => {
  try {
    return await req.Request.find({
      user_id,
      status: "requested",
    })
      .sort({
        _id: -1,
      })
      .limit(4);
  } catch (error) {
    utils.logError(error);
  }
};

module.exports = {
  queryReceivedPrayers,
  querySentPrayers,
  queryPosts,
  queryAnsweredRequests,
  queryRequests,
};
