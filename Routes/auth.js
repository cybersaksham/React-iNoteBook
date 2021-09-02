const express = require("express");
const User = require("../Models/User");

const router = express.Router();

router.post("/createUser", (req, res) => {
  const user = User(req.body);
  user.save();
  res.json(req.body);
});

module.exports = router;
