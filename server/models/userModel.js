import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },

    accountType: {
        type: String,
        default: "user",
    },
    image: {
        type: String,
    },
    password: {
        type: String,
        Select: true
    },
    provider: {
        type: String,
        default: "Darklegion"
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "Followers",
    }],
    phoneNumber:{
        type: String,
        required: false
    }
}, {timestamps: true});

const Users = mongoose.model("Users", userSchema);

export default Users;