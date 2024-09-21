const mongoose = require("mongoose");
// const dbgr = require("debug")("development:mongoose");
const config=require("config")

mongoose
    .connect(
        `${config.get("MONGODB_URI")}`,
    )
    .then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });

module.exports = mongoose.connection;
