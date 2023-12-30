import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true //for searching in database
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        index: true //for searching in database
    },
    avatar: {
        type: String, //cloudinary or (aws service) url
        required: true
    },
    coverImage: {
        type: String //cloudinary or (aws service) url
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true
    },
    refreshToken: {
        type: String
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ]

}, { timestamps: true })

//encrypt password
    // when you use middle (here pre), not use arrow function
    // pre have two params. (1)method name (2)async function 
userSchema.pre("save", async function (next) {
    //encrypt password only when user want modified it. If user not modify password then return next().
    if(!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

//decrypt password
    // create method - isPasswordCorrect, and then make async function with input param - paassword
userSchema.methods.isPasswordCorrect = async function (password) {
    //compare need two params (1)orignal password (2)encrypted password
    return await bcrypt.compare(password, this.password)
}

//access token generat
userSchema.methods.generateAccessToken = function () {
    //syntax : jwt.sign({payload}, env-variable, {expiry})
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname   
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

//refresh token generat
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id, 
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

export const User = mongoose.model("User", userSchema)