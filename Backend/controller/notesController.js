const Notes = require("../model/Notes");

// Add notes controller
const addNotes = async (req, res) => {
  // const { title, content, tags } = req.body;
  let title, content, tags;

  try {
    ({ title, content, tags } = req.body);

    // if (!title) {
    //   res.status(400).json({ success: false, message: "Please enter tittle" });
    // }
    // if (!content) {
    //   res.status(400).json({ success: false, message: "Please enter content" });
    // }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid request body" });
  }

  const userID = req.user.userID;
  //   const userIDD = req.user;

  console.log(`From line 17: ${userID}`);
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
      .json({ success: true, message: "Note added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "failed to add new user note " });
  }
};

module.exports = { addNotes };
