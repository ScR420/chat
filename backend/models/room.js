const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    isPrivate: { type: Boolean, default: false },
    password: { type: String, default: null }, // Nur erforderlich, wenn isPrivate true ist
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);