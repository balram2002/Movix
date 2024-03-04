const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dob: { type: String, required: true },
    language: { type: String },
    genre: { type: String, required: true },
    job: { type: String },
    country: { type: String },
    profile: { type: String },
});

module.exports = mongoose.model("users", userSchema);
