const utils = require("../utils/utils");
const validation = require("../utils/validation");
const hashPass = require("../utils/password");
const accountSettingsModel = require("../models/accountSettings");
const userModel = require("../models/user");

const express = require("express");
const router = express.Router();

async function query(elem) {
  try {
    const { user_id, password, privacy } = elem;
    const user = await userModel.User.findById(user_id);

    if (user) {
      const auth = await hashPass.unhashPassword({ password, user });

      if (auth) {
        await accountSettingsModel.AccountSettings.findOneAndUpdate(
          { user_id },
          { privacy }
        );

        await userModel.User.findByIdAndUpdate(user_id, { privacy });
      }
    }
  } catch (error) {
    utils.logError(error);
  }
}

router.post("/", async (req, res) => {
  try {
    const { user_id, password } = req.body;
    const {
      showAge,
      showCity,
      showCountry,
      showDenomination,
      showReligion,
      showSponsorship,
    } = req.body.privacy;

    const validatedObj = {
      user_id: validation.validateId(user_id),
      password: validation.validatePassword(password),
      privacy: {
        showCity: validation.validateBoolean(showCity),
        showCountry: validation.validateBoolean(showCountry),
        showReligion: validation.validateBoolean(showReligion),
        showDenomination: validation.validateBoolean(showDenomination),
        showSponsorship: validation.validateBoolean(showSponsorship),
        showAge: validation.validateBoolean(showAge),
      },
    };

    await query(validatedObj);
    res.end("Success");
  } catch (error) {
    utils.logError(error);
  }
});

module.exports = router;
