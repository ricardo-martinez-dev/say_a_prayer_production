const rnk = require("../../models/ranking");
const utils = require("../utils");

const updateRanking = async (obj) => {
  try {
    return await rnk.Ranking.findOneAndUpdate(
      { user_id: obj.user },
      { $inc: obj.value }
    );
  } catch (error) {
    utils.logError(error);
  }
};

const updatePostRestore = async ({ user_id, src }) => {
  await updateRanking({ user: user_id, value: { requests: 1 } });

  if (src === "answered") {
    await updateRanking({ user: user_id, value: { answered: -1 } });
  }
  if (src === "deleted") {
    await updateRanking({ user: user_id, value: { deleted: -1 } });
  }

  return;
};

module.exports = {
  updateRanking,
  updatePostRestore,
};
