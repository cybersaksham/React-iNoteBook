const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const fetchUser = require("../MiddleWare/fetch-user");

const router = express.Router();

const JWT_SECRET = "NOT_SO_SECRET";

// Creating a new user
router.post(
  "/create",
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
      return res.status(400).json({ error: errors.array()[0].msg });
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
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

// Login user
router.post(
  "/login",
  [
    // Validators
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
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    try {
      // Getting user if it exists already
      let user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ error: "Try to login with correct credentials." });

      // Comparing Password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare)
        return res
          .status(400)
          .json({ error: "Try to login with correct credentials." });

      // Generating Token
      const data = {
        user: { id: user.id },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });
    } catch (error) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

// Fetch user
router.post("/fetch", fetchUser, async (req, res) => {
  try {
    // Finding User
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    return res.send(user);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
