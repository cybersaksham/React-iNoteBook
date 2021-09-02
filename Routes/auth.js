const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../Models/User");

const router = express.Router();

router.post(
  "/createUser",
  [
    body("name", "Name must be 3 characters long.").isLength({ min: 3 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password must be between 5 & 10 character.").isLength({
      min: 5,
      max: 10,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(400)
        .json({ error: "User already exists with this email id." });
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json(user);
  }
);

module.exports = router;
