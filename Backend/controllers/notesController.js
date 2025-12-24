const Notes = require("../model/Notes");

// Add notes controller
const addNotes = async (req, res) => {
  // const { title, content, tags } = req.body;
  let title, content, tags;

  try {
    ({ title, content, tags } = req.body);

    // if (!title) {
    //   return res.status(400).json({ success: false, message: "Please enter tittle" });
    // }
    // if (!content) {
    //  return res.status(400).json({ success: false, message: "Please enter content" });
    // }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid request body, Please enter a tittle and content or tags",
    });
  }

  const userID = req.user.userID;
  //   const userIDD = req.user;

  // console.log(`From line 17: ${userID}`);
  //   console.log(`From line 18: ${userIDD._id}`);

  try {
    const note = new Notes({
      title,
      content,
      tags: tags || [],
      userID,
    });
    await note.save();
    return res
      .status(200)
      .json({ success: true, message: "Note added successfully", note });
  } catch (error) {
    return res
      .status(500)
      .json({ success: true, message: "failed to add new user note " });
  }
};

// function to edit or update notes
const editNotes = async (req, res) => {
  const notesID = req.params.noteID;

  const userID = req.user.userID;

  // This works but prints an error in the console
  // const { title, content, tags, isPinned } = req.body;
  // if (!title && !content && !tags) {
  //   return res
  //     .status(400)
  //     .json({ success: false, message: "No changes provided" });
  // }

  let title, content, tags, isPinned;

  try {
    ({ title, content, tags } = req.body);
    if (!title && !content && !tags) {
      return res
        .status(400)
        .json({ success: false, message: "No changes provided" });
    }
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Invalid notes request body",
    });
  }
  // This also works but I think I prefer what is above
  // Safe destructuring with default values
  // const { title, content, tags, isPinned } = req.body || {};

  // // Check if any fields are provided for update
  // if (!title && !content && !tags && isPinned === undefined) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "No changes provided",
  //   });
  // }

  try {
    const editedNote = await Notes.findOne({ _id: notesID, userID });

    if (!editedNote) {
      return res
        .status(400)
        .json({ success: true, message: "Notes not found", editedNote });
    }

    if (title) {
      editedNote.title = title;
    }
    if (content) {
      editedNote.content = content;
    }
    if (tags) {
      editedNote.tags = tags;
    }
    if (isPinned) {
      editedNote.isPinned = isPinned;
    }

    await editedNote.save();

    return res.status(200).json({
      success: true,
      message: "Notes edited successfully",
      editedNote,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Internal server error, Failed to edit notes",
    });
  }
};

// get all notes
const getAllNotes = async (req, res) => {
  const userID = req.user.userID;
  try {
    const allNotes = await Notes.find({ userID }).sort({ isPinned: -1 });

    return res.status(200).json({
      success: true,
      message: "All notes are fetched successfully",
      allNotes,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Internal server error, failed to fetch all notes",
    });
  }
};

// delete Note
const deleteNote = async (req, res) => {
  // get the notes ID from the URL params
  const noteID = req.params.noteID;
  // get the note ID from the json web token of the user
  const userID = req.user.userID;

  try {
    const findNote = await Notes.findOne({ _id: noteID, userID });

    if (!findNote) {
      return res
        .status(400)
        .json({ success: false, message: "Note not found" });
    }

    await Notes.deleteOne({ _id: noteID, userID });

    return res
      .status(200)
      .json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Internal server error, Note not found",
    });
  }
};

// Update isPinned note
const updatePinnedNote = async (req, res) => {
  const notesID = req.params.noteID;

  const userID = req.user.userID;

  // Safe destructuring with default values
  const { isPinned } = req.body || {};
  // // Check if any fields are provided for update
  if (!isPinned) {
    return res.status(400).json({
      success: false,
      message: "Pinned changes not provided",
    });
  }

  try {
    const editedNote = await Notes.findOne({ _id: notesID, userID });

    if (!editedNote) {
      return res
        .status(400)
        .json({ success: true, message: "Notes not found" });
    }

    if (isPinned) {
      editedNote.isPinned = isPinned;
    }

    await editedNote.save();

    return res.status(200).json({
      success: true,
      message: "Pinned mote edited successfully",
      editedNote,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Internal server error, Failed to edit pinned notes",
    });
  }
};

// Search Notes
const searchNotes = async (req, res) => {
  const { userID } = req.user;
  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({ success: false, message: "Search query is required" });
  }

  try {
    const matchedNotes = await Notes.find({
      userID,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Note matched and query retrieved successfully",
      notes: matchedNotes,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Internal server error, Failed to search for user",
    });
  }
};

module.exports = {
  addNotes,
  editNotes,
  getAllNotes,
  deleteNote,
  updatePinnedNote,
  searchNotes,
};
