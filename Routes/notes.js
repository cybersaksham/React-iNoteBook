const express = require("express");
const { body, validationResult } = require("express-validator");
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

// Create New Note
router.post(
  "/",
  fetchUser,
  [
    // Validators
    body("title", "Title must be 3 characters long.").isLength({ min: 3 }),
    body("description", "Description must be 5 characters long.").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Sending error if validator failed
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;

      // Creating Note
      const note = new Notes({ title, description, tag, user: req.user.id });

      // Savign Note
      const savedNote = await note.save();

      return res.json(savedNote);
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
