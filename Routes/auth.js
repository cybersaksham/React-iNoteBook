const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const router = express.Router();

const JWT_SECRET = "NOT_SO_SECRET";

router.post(
  "/",
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

      // Hashing Password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Creating a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // Generating Token
      const data = {
        user: { id: user.id },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
