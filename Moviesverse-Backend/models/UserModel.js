import mongoose from "mongoose";

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

const Users = mongoose.model("users", userSchema);
export default Users;
