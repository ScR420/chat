const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    username: String,
    message: String,
    room: String,
}, { timestamps: true });

module.exports = mongoose.model("Message", MessageSchema);