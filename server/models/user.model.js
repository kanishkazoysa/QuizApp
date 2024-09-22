import mongoose from "mongoose";

// User Schema
// Time stamps are used to add cretedAt and updatedAt fields to the schema automatically
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true
    },
    lastLoginDate: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,

},{timestamps: true});

export const User = mongoose.model("User", userSchema);