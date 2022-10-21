const express = require("express");
const router = express.Router();

// models
const userModel = require("../models/user");
const notificationsModel = require("../models/notifications");
const rankingModel = require("../models/ranking");
const accountSettingsModel = require("../models/accountSettings");
const pictureModel = require("../models/picture");
const bookmarkModel = require("../models/bookmarks");
const loveSentModel = require("../models/loveSent");
const loveReceivedModel = require("../models/loveReceived");
const frindshipRequestModel = require("../models/friendshipRequest");
const loveModel = require("../models/love");
const postsModel = require("../models/post");
const prayersModel = require("../models/prayers");
const requestsModel = require("../models/request");

// utils
const utils = require("../utils/utils");
const hashPass = require("../utils/password");
const validation = require("../utils/validation");

const deleteBookmarks = async (user_id) => {
  bookmarkModel.Bookmarks.findOneAndDelete({ user_id }, (err, res) => {
    if (err) console.log(err);
  });
};

const deleteFriendRequest = async (user_id) => {
  frindshipRequestModel.FriendshipRequest.findOneAndDelete(
    { user_id },
    (err, res) => {
      if (err) console.log(err);
    }
  );
};

const deleteLovesFrom = async (user_id) => {
  loveModel.Love.findOneAndDelete({ from_user: user_id }, (err, res) => {
    if (err) console.log(err);
  });
};

const deleteLovesTo = async (user_id) => {
  loveModel.Love.findOneAndDelete({ to_user: user_id }, (err, res) => {
    if (err) console.log(err);
  });
};

const deleteLovesSent = async (user_id) => {
  loveSentModel.LoveSent.findOneAndDelete({ user_id }, (err, res) => {
    if (err) console.log(err);
  });
};

const deleteLoveReceived = async (user_id) => {
  loveReceivedModel.LoveReceived.findOneAndDelete({ user_id }, (err, res) => {
    if (err) console.log(err);
  });
};

const deletePosts = async (user_id) => {
  postsModel.Post.findOneAndDelete({ user_id }, (err, res) => {
    if (err) console.log(err);
  });
};

const deletePrayerFrom = async (user_id) => {
  prayersModel.Prayers.findOneAndDelete({ from_user: user_id }, (err, res) => {
    if (err) console.log(err);
  });
};

const deletePrayerTo = async (user_id) => {
  prayersModel.Prayers.findOneAndDelete({ to_user: user_id }, (err, res) => {
    if (err) console.log(err);
  });
};

const deleteRequests = async (user_id) => {
  requestsModel.Request.findOneAndDelete({ user_id }, (err, res) => {
    if (err) console.log(err);
  });
};

const deleteUser = async (_id) => {
  userModel.User.findOneAndDelete({ _id }, (err) => {
    if (err) console.log(err);
  });
};

const deleteRanking = async (user_id) => {
  rankingModel.Ranking.findOneAndDelete({ user_id }, (err, res) => {
    if (err) console.log(err);
  });
};

const deleteNotifications = async (user_id) => {
  notificationsModel.Notifications.findOneAndDelete({ user_id }, (err, res) => {
    if (err) console.log(err);
  });
};

const deleteAccountSettings = async (user_id) => {
  accountSettingsModel.AccountSettings.findOneAndDelete(
    { user_id },
    (err, res) => {
      if (err) console.log(err);
    }
  );
};

const deletePicture = async (user_id) => {
  pictureModel.Picture.findOneAndDelete({ user_id }, (err, res) => {
    if (err) console.log(err);
  });
};

router.post("/", async (req, res) => {
  try {
    let isUserAuthenticated = false;

    // validate input
    const user_id = validation.validateId(req.body.user_id);
    const user = await userModel.User.findById(user_id);
    if (user_id === process.env.RECRUTER_ID) return;

    // validade user
    // todo : extract this code into a user authenticating function
    if (user) {
      if (user == process.env.RECRUTER_ID) return;

      const password = validation.validatePassword(req.body.password);
      const auth = await hashPass.unhashPassword({ password, user });

      if (auth) {
        // user authenticated
        isUserAuthenticated = true;
      }
    }

    if (!isUserAuthenticated) {
      // user not authenticated
      return;
    }

    await deleteUser(user_id);
    await deleteAccountSettings(user_id);
    await deleteNotifications(user_id);
    await deleteRanking(user_id);
    await deletePicture(user_id);
    await deleteBookmarks(user_id);
    await deleteFriendRequest(user_id);
    await deleteLovesFrom(user_id);
    await deleteLovesTo(user_id);
    await deleteLovesSent(user_id);
    await deleteLoveReceived(user_id);
    await deletePosts(user_id);
    await deletePrayerFrom(user_id);
    await deletePrayerTo(user_id);
    await deleteRequests(user_id);

    res.end("Success");
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
    utils.logError(error);
  }
});

router.post("/permission", async (req, res) => {
  try {
    const validatedObj = {
      // ----------- DELETED CODE HERE ----------- //
      // ----------- DELETED CODE HERE ----------- //
      // ----------- DELETED CODE HERE ----------- //
    }
    const notAllowedToDelete = [
      // ----------- DELETED CODE HERE ----------- //
      // ----------- DELETED CODE HERE ----------- //
      // ----------- DELETED CODE HERE ----------- //
    ];
    const allowDeletion = notAllowedToDelete.includes(validatedobj) ? false : true;

    res.status(200).json({ allowDeletion });
  } catch (error) {
    utils.logError(error);
  }
});

module.exports = router;
