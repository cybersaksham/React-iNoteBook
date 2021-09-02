const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../Models/User");

const router = express.Router();

router.post(
  "/createUser",
  [
    // Validators
    body("name", "Name must be 3 characters long.").isLength({ min: 3 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password must be between 5 & 10 character.").isLength({
      min: 5,
      max: 10,
    }),
  ],
  async (req, res) => {
    // Sending error if validator failed
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Getting user if it exists already
      let user = await User.findOne({ email: req.body.email });
      if (user)
        return res
          .status(400)
          .json({ error: "User already exists with this email id." });

      // Creating a new user
      user = await User.csreate({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json(user);
    } catch (error) {
      res.status(500).send("Some error occurred");
    }
  }
);

module.exports = router;
