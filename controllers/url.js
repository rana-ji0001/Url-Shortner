const shortid = require("shortid");
const URL = require("../models/url");
async function generateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(404).json({ error: "Url is required" });
    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    const urls = await URL.find({});
    return res.render("home", { id: shortId });


};
async function getAnalytic(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });


}
module.exports = {
    generateNewShortUrl,
    getAnalytic,
};