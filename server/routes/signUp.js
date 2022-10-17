const utils = require("../utils/utils");
const validation = require("../utils/validation");
const signUpUtils = require("../utils/routes/signUp");
const express = require("express");
const router = express.Router();
const hashPass = require("../utils/password");

router.post("/", async (req, res) => {
  try {
    const { fname, lname, email, password, confirmedPassword } = req.body;

    const validEmail = validation.validateEmail(email);
    const validPassword = validation.validatePassword(password);
    const validConfirmedPassword =
      validation.validatePassword(confirmedPassword);

    const validFirstName = validation.validateName(fname);
    const validLastName = validation.validateName(lname);

    const newUserObj = {
      fname: validFirstName,
      lname: validLastName,
      email: validEmail,
      password: await hashPass.hashPassword(validPassword),
      confirmedPassword: validConfirmedPassword,
    };

    // check whether any input is empty
    const isEmpty = signUpUtils.checkForEmptyInput(req.body);
    if (isEmpty) {
      res.json({ status: "error", message: "empty input" });
      return;
    }

    // check whether user already exists
    const foo = await signUpUtils.getUser(validEmail);
    if (foo.length > 0) {
      res.json({ status: "error", message: "user exists" });
      return;
    }

    // check whether password === confirmedPassword
    const invalidPass =
      validPassword.toString() !== validConfirmedPassword.toString();
    if (invalidPass) {
      res.json({ status: "error", message: "unmatched passwords" });
      return;
    }

    // check whether password input is valid
    const isValidPassword = validation.validatePassword(validPassword);
    if (!isValidPassword) {
      res.json({ status: "error", message: "invalid password" });
      return;
    }

    // -- create user
    const newUserResult = await signUpUtils.saveUserInstance(newUserObj);
    const newUserId = newUserResult.res._id;
    if (newUserResult.status === "fail") signUpUtils.returnFailMsg("user");

    // -- create notification
    const newNotificationResult = await signUpUtils.saveNotificationInstance(
      newUserId
    );
    if (newNotificationResult.status === "fail") {
      // todo : if fails delete : user
    }

    // -- create account settings
    const newSettingsResult = await signUpUtils.saveSettingsInstance(newUserId);
    if (newSettingsResult.status === "fail") {
      // todo : if fails delete : user, notification
    }

    // -- create picture
    const newPictureResult = await signUpUtils.savePictureInstance(newUserId);
    if (newPictureResult.status === "fail") {
      // todo : if fails delete : user, notification, settings
    }

    // -- create ranking
    const newRankingResult = await signUpUtils.saveRankingInstance(newUserId);
    if (newRankingResult.status === "fail") {
      // todo : if fails delete : user, notification, settings, picture
    }

    // -- create love sent
    const newLoveSentResult = await signUpUtils.saveLoveSentInstance(newUserId);
    if (newLoveSentResult.status === "fail") {
      // todo : if fails delete : user, notification, settings, picture
    }

    // -- create love received
    const newLoveReceivedResult = await signUpUtils.saveLoveReceivedInstance(
      newUserId
    );
    if (newLoveReceivedResult.status === "fail") {
      // todo : if fails delete : user, notification, settings, picture
    }

    // -- create requests
    let user = newUserResult.res;

    // -- send response
    res.status(200).send({ res: user, status: "success" });
  } catch (error) {
    utils.logError(error);
  }
});

module.exports = router;
