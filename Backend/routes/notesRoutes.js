const express = require("express");

// import notes controllers
const { addNotes, editNotes } = require("../controller/notesController.js");

// import middleware
const authenticateToken = require("../middleware/utilities");

const router = express.Router();

router.post("/add-notes", authenticateToken, addNotes);
router.put("/edit-notes/:noteID", authenticateToken, editNotes);

module.exports = router;
