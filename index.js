const express = require("express");
const { connectToMongo } = require("./connect");
const URL = require("./models/url");
const path = require("path");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticrouter")
const userRoute = require("./routes/user");
const { restrictToUserLoggedInOnly, checkAuth } = require("./middleware/auth");

const cookieParser = require("cookie-parser");
const Port = 8001;
const app = express();
app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


connectToMongo("mongodb://127.0.0.1:27017/url-shortner").then(() => {
    console.log("mongoDb is connected");
});


app.use("/url", restrictToUserLoggedInOnly, urlRoute);//you have to loged in if you want to access /url page from routes/url.js
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

// app.delete("/url/:shortId", async (req, res) => {

//     await URL.findOneAndDelete(req.params.shortId);
//     return res.status(200).json({ status: "Successfully delted" });
// });
app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },

            },
        }
    );
    res.redirect(entry.redirectUrl);
});
// app.get("/url/test", async (req, res) => {
//     const allurls = await URL.find({});
//     return res.render('home', {
//         urls: allurls,
//     });
// })
app.listen(Port, () => {
    console.log(`server is listening to Port:${Port}`);
});

