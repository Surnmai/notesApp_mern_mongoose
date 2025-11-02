const express = require("express");

// import notes controllers
const { addNotes } = require("../controller/notesController.js");

// import middleware
const authenticateToken = require("../middleware/utilities");

const router = express.Router();

router.post("/add-notes", authenticateToken, addNotes);

module.exports = router;
