const express = require("express");

const jwtMiddleWare = require("../middleware/utilities");

const { createUser, login, getUser } = require("../controller/userController");

const router = express.Router();

router.post("/create-account", createUser);
router.post("/login", login);
router.get("/get-user", jwtMiddleWare, getUser);

module.exports = router;
