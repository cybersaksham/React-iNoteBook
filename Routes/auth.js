const express = require("express");

const router = express.Router();

router.post("/createUser", (req, res) => {
  res.json(req.body);
});

module.exports = router;
