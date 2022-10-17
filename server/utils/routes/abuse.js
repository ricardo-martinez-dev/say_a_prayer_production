const requests = require("../../models/request");
const utils = require("../utils");

const addReport = async (elem) => {
  try {
    const { request_id, user_id } = elem;
    await requests.Request.findByIdAndUpdate(request_id, {
      $push: { abuse: user_id },
    });
  } catch (error) {
    utils.logError(error);
    throw error;
  }
};

const checkIfContentIsAbusive = async (request_id) => {
  try {
    const abuseArray = await requests.Request.findById(request_id);
    return abuseArray.abuse.length > 4 ? true : false;
  } catch (error) {
    utils.logError(error);
    throw error;
  }
};

const setContentAsAbusive = async (request_id) => {
  // todo : set content as abusive
  try {
    await requests.Request.findByIdAndUpdate(request_id, {
      status: "abusive",
    });
  } catch (error) {
    utils.logError(error);
    throw error;
  }
};

const query = async (elem) => {
  try {
    const { request_id, user_id } = elem;
    await addReport(elem);

    // check whether content is abusive
    const isAbusive = await checkIfContentIsAbusive(request_id);

    isAbusive ? setContentAsAbusive(request_id) : null;
  } catch (error) {
    utils.logError(error);
    throw error;
  }
};

module.exports = {
  query,
};
