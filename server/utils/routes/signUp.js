const user = require("../../models/user");
const notify = require("../../models/notifications");
const settings = require("../../models/accountSettings");
const picture = require("../../models/picture");
const ranking = require("../../models/ranking");
const loveSent = require("../../models/loveSent");
const loveReceived = require("../../models/loveReceived");
const utils = require("../utils");

const checkForEmptyInput = (obj) => {
  for (let i in obj) {
    const isValid = obj[i].length > 0;
    if (!isValid) return true;
  }

  return false;
};

const getUser = async (email) => {
  return await user.User.find({ email }, "email -_id");
};

const returnFailMsg = (target) => {
  const error = `failed saving new ${target}`;
  utils.logError(error);
  throw error;
};

const saveUserInstance = async (obj) => {
  return new Promise(async (resolve, reject) => {
    const userModel = user.User(obj);
    await userModel.save((error, res) => {
      if (error) {
        utils.logError(error);
        reject({ error: error.message, status: "fail" });
      }

      resolve({ res, status: "success" });
    });
  });
};

const saveNotificationInstance = async (user_id) => {
  return new Promise(async (resolve, reject) => {
    const user = notify.Notifications({ user_id });
    await user.save((error, res) => {
      if (error) {
        utils.logError(error);
        reject({ error: error.message, status: "fail" });
      }

      resolve({ res, status: "success" });
    });
  });
};

const saveRankingInstance = async (user_id) => {
  return new Promise(async (resolve, reject) => {
    const user = ranking.Ranking({ user_id });
    await user.save((error, res) => {
      if (error) {
        utils.logError(error);
        reject({ error: error.message, status: "fail" });
      }

      resolve({ res, status: "success" });
    });
  });
};

const saveSettingsInstance = async (user_id) => {
  return new Promise(async (resolve, reject) => {
    const user = settings.AccountSettings({ user_id });
    await user.save((error, res) => {
      if (error) {
        utils.logError(error);
        reject({ error: error.message, status: "fail" });
      }

      resolve({ res, status: "success" });
    });
  });
};

const savePictureInstance = async (user_id) => {
  return new Promise(async (resolve, reject) => {
    const user = picture.Picture({ user_id });
    await user.save((error, res) => {
      if (error) {
        utils.logError(error);
        reject({ error: error.message, status: "fail" });
      }

      resolve({ res, status: "success" });
    });
  });
};

const saveLoveSentInstance = async (user_id) => {
  return new Promise(async (resolve, reject) => {
    const user = loveSent.LoveSent({ user_id });
    await user.save((error, res) => {
      if (error) {
        utils.logError(error);
        reject({ error: error.message, status: "fail" });
      }

      resolve({ res, status: "success" });
    });
  });
};

const saveLoveReceivedInstance = async (user_id) => {
  return new Promise(async (resolve, reject) => {
    const user = loveReceived.LoveReceived({ user_id });
    await user.save((error, res) => {
      if (error) {
        utils.logError(error);
        reject({ error: error.message, status: "fail" });
      }

      resolve({ res, status: "success" });
    });
  });
};

module.exports = {
  saveNotificationInstance,
  saveSettingsInstance,
  saveUserInstance,
  savePictureInstance,
  saveRankingInstance,
  returnFailMsg,
  checkForEmptyInput,
  getUser,
  saveLoveSentInstance,
  saveLoveReceivedInstance,
};
