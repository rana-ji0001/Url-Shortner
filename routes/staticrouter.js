const express = require("express");
const URL = require("../models/url")

const router = express.Router();
router.get("/", async (req, res) => {
    if (!req.user) return res.redirect("/login");
    const urls = await URL.find({ createdBy: req.user._id }); // now I will only got those urls which were created by that user with object Id
    // // console.log(allurls);
    return res.render("home", { urls });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
})
router.get("/login", (req, res) => {
    return res.render("login");
})

module.exports = router;