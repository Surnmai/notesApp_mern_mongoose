const express = require("express");

// import notes controllers
const {
  addNotes,
  editNotes,
  getAllNotes,
  deleteNote,
  updatePinnedNote,
  searchNotes,
} = require("../controllers/notesController");

// import middleware
const authenticateToken = require("../middleware/utilities");

const router = express.Router();

router.post("/add-notes", authenticateToken, addNotes);
router.put("/edit-notes/:noteID", authenticateToken, editNotes);
router.get("/get-all-notes/", authenticateToken, getAllNotes);
router.delete("/delete-notes/:noteID", authenticateToken, deleteNote);
router.put("/update-notes-pinned/:noteID", authenticateToken, updatePinnedNote);
router.get("/search-notes", authenticateToken, searchNotes);

module.exports = router;
