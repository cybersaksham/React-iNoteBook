const express = require("express");
const { body, validationResult } = require("express-validator");
const Notes = require("../Models/Notes");
const fetchUser = require("../MiddleWare/fetch-user");

const router = express.Router();

// Fetch All Notes
router.get("/", fetchUser, async (req, res) => {
  try {
    // Finding Notes
    const notes = await Notes.find({ user: req.user.id });
    return res.json(notes);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
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
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    try {
      const { title, description, tag } = req.body;

      // Creating New Note
      const newNote = {};
      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tag !== "" && tag !== null) newNote.tag = tag;

      // Creating Note
      const note = new Notes({ ...newNote, user: req.user.id });

      // Saving Note
      const savedNote = await note.save();

      return res.json(savedNote);
    } catch (error) {
      return res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

// Update Existing Note
router.put(
  "/:id",
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
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    try {
      const { title, description, tag } = req.body;

      // Creating New Note
      const newNote = {};
      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tag !== "" && tag !== null) newNote.tag = tag;
      else newNote.tag = "General";

      // Finding Note
      let note = await Notes.findById(req.params.id);
      if (!note) return res.status(404).send({ error: "Not Found" });
      if (note.user.toString() !== req.user.id)
        return res.status(401).send({ error: "Not Allowed" });

      // Updating Note
      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );

      const notes = await Notes.find({ user: req.user.id });
      return res.json({ notes });
    } catch (error) {
      return res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

// Delete Note
router.delete("/:id", fetchUser, async (req, res) => {
  try {
    // Finding Note
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send({ error: "Not Found" });
    if (note.user.toString() !== req.user.id)
      return res.status(401).send({ error: "Not Allowed" });

    // Deleting Note
    note = await Notes.findByIdAndDelete(req.params.id);

    const notes = await Notes.find({ user: req.user.id });
    return res.json({ notes });
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

// Delete All Notes
router.post("/dltAll", fetchUser, async (req, res) => {
  try {
    // Finding Notes
    const notes = await Notes.find({ user: req.user.id });

    // Deleting Notes
    notes.forEach(async (note) => {
      if (!note) return res.status(404).send({ error: "Not Found" });
      if (note.user.toString() !== req.user.id)
        return res.status(401).send({ error: "Not Allowed" });

      await Notes.findByIdAndDelete(note.id);
    });

    return res.json({ notes: [] });
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
