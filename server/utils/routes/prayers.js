const prayer = require("../../models/prayers");
const user = require("../../models/user");
const requests = require("../../models/request");
const utils = require("../utils");

queryPrayers = async (request_id) => {
  try {
    let obj = {};

    obj.request = await requests.Request.findById(request_id);
    const prayers = await prayer.Prayers.find({ request_id }).sort({
      _id: -1,
    });
    obj.prayers = prayers;

    const arr = await getUserInfo(prayers);

    obj.author_info = await user.User.find(
      { ObjectId: { $in: [arr] } },
      "pic fname lname"
    );

    return obj;
  } catch (error) {
    utils.logError(error);
  }
};

getUserInfo = async (prayers) => {
  return await prayers.map((prayer) => prayer.from_user);
};

getPrayers = async (obj) => {
  const { reqId } = obj;
  try {
    const result = await queryPrayers(reqId);

    return result;
  } catch (error) {
    utils.logError(error);
  }
};

module.exports = { getPrayers, handleLove };
