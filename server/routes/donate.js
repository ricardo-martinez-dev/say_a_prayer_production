const userModel = require("../models/user");
const validation = require("../utils/validation");
const hashPass = require("../utils/password");

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const user_id = validation.validateId(req.body.user_id);
  const email = validation.validateEmail(req.body.email);
  const password = validation.validatePassword(req.body.password);
  const donation = validation.validateString(req.body.donation);

  const user = await userModel.User.findOne({ email });

  if (!user) return; // user not found

  const auth = await hashPass.unhashPassword({ password, user: user });

  if (!auth) return; // authentication failed

  const totalQttDonated = user._doc.sponsorship.totalQuantityDonated;

  const parsedTotalQuantityDonated = parseInt(
    !totalQttDonated ||
      totalQttDonated.toLowerCase() === "nan" ||
      totalQttDonated === ""
      ? 0
      : totalQttDonated
  );
  const parsedDonation = parseInt(donation);

  const updatedUser = {
    ...user._doc,
    sponsorship: {
      isSponsor: true,
      lastDonationDate: new Date().getTime(),
      lastQuantityDonated: "5.00",
      totalQuantityDonated: parseFloat(
        parsedTotalQuantityDonated + parsedDonation
      ).toFixed(2),
    },
  };

  await userModel.User.findByIdAndUpdate(user_id, updatedUser);

  res.status(200).json({ message: "success" });
});

module.exports = router;
