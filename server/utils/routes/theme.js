const settings = require("../../models/accountSettings");
const utils = require("../utils");
const userModel = require("../../models/user");
const hashPass = require("../password");

const query = async (elem) => {
  try {
    const { user_id, password, chosenTheme } = elem;
    const user = await userModel.User.findById(user_id);

    if (user) {
      const auth = await hashPass.unhashPassword({ password, user });

      if (!auth) return;

      return await settings.AccountSettings.findOneAndUpdate(
        { user_id },
        { chosenTheme }
      );
    }
  } catch (error) {
    utils.logError(error);
  }
};

module.exports = { query };
