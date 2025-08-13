

const express = require("express");
const { userSignUp, handleUserLogin } = require("../controllers/user");
const router = express.Router();
router.post("/", userSignUp);
router.post("/login", handleUserLogin);
module.exports = router;