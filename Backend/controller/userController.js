const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// create user controller
const createUser = async (req, res) => {
  try {
    // get the user info from the form
    const { fullname, email, password } = req.body;

    // validate registration fields
    if (!fullname) {
      return res
        .status(401)
        .json({ success: false, message: "Full name is required" });
    }
    if (!email) {
      return res
        .status(401)
        .json({ success: false, message: "Email is required" });
    }
    if (!password) {
      return res
        .status(401)
        .json({ success: false, message: "Password is required" });
    }

    // check if the use already exist
    const checkForExistingUser = await User.findOne({ email });
    if (checkForExistingUser) {
      return res.status(401).json({
        success: false,
        message: "Email/User already exist. Please try with a different email",
      });
    }

    // hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create a new user
    const newUser = await User.create({
      fullname,
      email,
      password: hashPassword,
    });

    // create access token
    const accessToken = jwt.sign({ newUser }, process.env.JWT_SECRETE_KEY, {
      expiresIn: "30m",
    });

    if (newUser) {
      return res.status(200).json({
        success: true,
        accessToken,
        message: "User created/registered successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Failed to create/register, please try again",
      });
    }
  } catch (error) {
    console.error(`Failed to create user ${error}`);
    res.status(500).json({ success: false, message: "Failed to create user" });
  }
};

// Login user controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: true, message: "Please enter your email" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: true, message: "Please enter your password" });
    }
    const verifyUser = await User.findOne({ email });

    if (!verifyUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email/User doesn't exist" });
    }

    const comparePassword = await bcrypt.compare(password, verifyUser.password);

    if (!comparePassword) {
      return res
        .status(401)
        .json({ success: false, message: "Password doesn't match" });
    }

    const accessToken = jwt.sign(
      {
        // verifyUser,
        userID: verifyUser._id,
        username: verifyUser.fullName,
        email: verifyUser.email,
      },
      process.env.JWT_SECRETE_KEY,
      {
        expiresIn: "30m",
      }
    );

    return res
      .status(200)
      .json({ success: true, message: "Login Successfully", accessToken });
  } catch (error) {
    console
      .error(`There was something wrong ${error}`)
      .json({ success: false, message: "Failed to login user" });
  }
};

module.exports = { createUser, login };
