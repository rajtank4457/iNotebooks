const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");

// Route 1: Get All the notes : GET "/api/auth/fetchallnotes" login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2 : Add a new  notes  using : POST "/api/auth/addnote" login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter Valid title").isLength({ min: 3 }),
    body("description", "description must be aleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 3: update and exesting  notes : Put "/api/note/updatenote" login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //create  a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find the note to be updated and updated it
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 4: Delete and exesting  notes : delete "/api/note/deletenote" login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be delete and delete  it
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not found");
    }
    //Allow deletion only if user owns this note

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been Deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error ");
  }
});

module.exports = router;
