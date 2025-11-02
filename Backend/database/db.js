const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB is connected successfully");
  } catch (error) {
    console.error("Database connection failed");
    process.exit(1);
  }
};

module.exports = connectDB;
