const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // ----------- DELETED CODE HERE ----------- //
    // ----------- DELETED CODE HERE ----------- //
    // ----------- DELETED CODE HERE ----------- //

    let result = {
      email,
      password,
      fname: "",
      lname: "",
      confirmedPassword: "",
    };

    res.status(200).send(result);
  } catch (error) {
    utils.logError(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
