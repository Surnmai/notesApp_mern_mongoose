// import dotenv
require("dotenv").config();

// import express
const express = require("express");
const app = express();

// import env file
const port = process.env.PORT || 8000;

// import cors
const cors = require("cors");

// middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));

// import mongoose connection
const connectDB = require("./database/db");

// call database connection
connectDB();

// import routes
const userRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/notesRoutes");

app.use("/", userRoutes);
app.use("/notes", notesRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
