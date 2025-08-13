const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        required: true,
    },

    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,//unique id for createdBY
        ref: "users",//points to user collections 
    },
}, { timestamps: true });

const URL = mongoose.model("url", urlSchema);
module.exports = URL;