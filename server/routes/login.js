const usr = require("../models/user");
const utils = require("../utils/utils");
const validation = require("../utils/validation");
const hashPass = require("../utils/password");

const express = require("express");
const router = express.Router();

// ! Passowrd hashing
// TODO : hash and unhash passwords

async function query(obj) {
  try {
    const { email, password } = obj;
    const user = await usr.User.findOne({ email });

    if (!user) {
      // usernot found
      return { status: "fail" };
    }

    // user found
    const auth = await hashPass.unhashPassword({ password, user });

    if (!auth) {
      // password not found
      return { status: "fail" };
    }

    // password found
    return [{ ...user._doc, password }];
  } catch (error) {
    utils.logError(error);
  }
}

function checkoutSponsorshipValidity(result) {
  const { lastDonationDate } = result[0].sponsorship;

  const today = new Date().getTime();
  const donationDatePlusMonth = new Date(
    parseInt(lastDonationDate) + 60 * 60 * 24 * 1000 * 30
  ).getTime();

  return today > donationDatePlusMonth || lastDonationDate === ""
    ? false
    : true;
}

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const validEmail = validation.validateEmail(email);
  const validPassword = validation.validatePassword(password);

  try {
    if (!validPassword) {
      res.json({ status: "error", message: "invalid password" });
      return;
    }

    const result = await query({
      email: validEmail,
      password: validPassword,
    });

    if (result.status && result.status == "fail") {
      res.send({ status: "error" });
      return;
    }

    const isValidSponsorship = checkoutSponsorshipValidity(result);

    if (!isValidSponsorship) {
      result[0]["sponsorship"]["isSponsor"] = false;

      // todo : make new user
      const newUser = await usr.User.findOne({ email: validEmail });
      newUser.sponsorship.isSponsor = false;

      const updatedUser = await usr.User.findOneAndUpdate(
        { email: validEmail },
        newUser
      );
    }

    res.json(result);
  } catch (error) {
    utils.logError(error);
  }
});

module.exports = router;
