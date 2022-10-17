const frnd = require("../../models/friendshipRequest");
const utils = require("../utils");

const sendRequest = async (obj) => {
  const { user_id, communityMember, event } = obj;
  try {
    const res = await new frnd.FriendshipRequest({
      from_user: user_id,
      to_user: communityMember,
      status: event,
      date: new Date(),
      createdAt: new Date(),
    });

    return await res.save();
  } catch (error) {
    utils.logError(error);
  }
};

const unfriend = async (obj) => {
  const { user_id, communityMember, event } = obj;
  try {
    let res = await frnd.FriendshipRequest.findOneAndDelete().or([
      {
        from_user: user_id,
        to_user: communityMember,
      },
      {
        from_user: communityMember,
        to_user: user_id,
      },
    ]);

    return null;
  } catch (error) {
    utils.logError(error);
  }
};

const acceptRequest = async (obj) => {
  const { user_id, communityMember, event } = obj;

  try {
    let result = null;
    let isReady = false;

    while (!isReady) {
      const obj = await frnd.FriendshipRequest.findOneAndUpdate(
        {
          from_user: communityMember,
          to_user: user_id,
        },
        { status: "accepted" },
        {
          returnNewDocument: true,
        },
        (error, result) => {
          if (error) {
            utils.logError({
              message: error.message ? error.message : null,
              error,
            });
            return;
          }

          isReady = true;
          return result;
        }
      );

      result = obj;
    }

    return result;
  } catch (error) {
    utils.logError(error);
  }
};

const rejectRequest = async (obj) => {
  const { user_id, communityMember, event } = obj;
  try {
    await frnd.FriendshipRequest.findOneAndDelete({
      from_user: communityMember,
      to_user: user_id,
    });

    return null;
  } catch (error) {
    utils.logError(error);
  }
};

const cancelRequest = async (obj) => {
  const { user_id, communityMember, event } = obj;
  try {
    await frnd.FriendshipRequest.findOneAndDelete({
      from_user: user_id,
      to_user: communityMember,
    });

    return null;
  } catch (error) {
    utils.logError(error);
  }
};

const updateFriendshipStatus = async (obj) => {
  const { event } = obj;
  try {
    const res =
      (await event) === "sent"
        ? sendRequest(obj)
        : (await event) === "cancel"
        ? cancelRequest(obj)
        : (await event) === "reject"
        ? rejectRequest(obj)
        : (await event) === "accept"
        ? acceptRequest(obj)
        : (await event) === "unfriend"
        ? unfriend(obj)
        : null;

    return res;
  } catch (error) {
    utils.logError(error);
  }
};

const queryFriendshipStatus = async (obj) => {
  try {
    const { user_id, communityMember, event } = obj;
    let res = await frnd.FriendshipRequest.find().or([
      {
        from_user: user_id,
        to_user: communityMember,
      },
      {
        from_user: communityMember,
        to_user: user_id,
      },
    ]);

    return res.length === 0 ? null : res[0];
  } catch (error) {
    utils.logError(error);
  }
};

module.exports = { updateFriendshipStatus, queryFriendshipStatus };
