const express = require("express");
const { generateNewShortUrl, getAnalytic } = require("../controllers/url");
const router = express.Router();
router.post("/", generateNewShortUrl);
router.get("/analytics/:shortId", getAnalytic)
module.exports = router;
