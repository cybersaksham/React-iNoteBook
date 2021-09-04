const express = require("express");
const Notes = require("../Models/Notes");
const fetchUser = require("../MiddleWare/fetch-user");
const { Router } = require("express");

const router = express.Router();

// Fetch All Notes
router.get("/", fetchUser, async (req, res) => {
  try {
    // Finding Notes
    const notes = await Notes.find({ user: req.user.id });
    return res.json(notes);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
