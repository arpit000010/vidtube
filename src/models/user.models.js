import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        watchHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video", // Reference to the Video model
            }
        ],
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,   // Ensures username is indexed for faster queries or fast searchable
        },
        email: {
            type: String,
            required: true,
            unique: true,   
            lowercase: true,
            trim: true,
        },
        password: {
            type: String, // encrypted password will be stored here,
            required: [true, "Password is required"], // custom error message
        },
        fullName: {
            type: String,
            required: true, 
            trim: true,
            index: true,   // Ensures fullName is indexed for faster queries or fast searchable
        },
        avatar: {
            type: String, // Cloudinary URL will be stored here,
            required: true,

        },
        coverImage: {
            type: String,
            
        },
        refreshToken: {
            type: String, // Refresh token for JWT authentication
        }
    }, 
    {
        timestamps: true
    }
);

// using next becuz it is a middleware function
// onsave run this prehook function
userSchema.pre("save", async function(next){
    if(this.isModified("password")){ // if password is modified, else suppose user is updating other fields
        // it will hash the password before saving it to the database again and again
        this.password = await bcrypt.hash(this.password, 10); // hash the password with 10 rounds of salt
    }
    next(); // call next to continue the save operation
})

 // custom method to compare password
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

// Generate JWT access token
// refresh token has lesser data than access token
userSchema.methods.generateAccessToken = function(password){
    jwt.sign(  // crates jwt token of data present
        {
            _id: this._id, // user id
            email: this.email, // user email
            username: this.username, // user username
            fullName: this.fullName, // user full name
        },
        proccess.env.ACCESS_TOKEN_SECRET, // secret key for signing the token
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h", // token expiry time, default is 1 hour
        }
    )
}

// Generate JWT refresh token
userSchema.methods.generateRefreshToken = function(password){
    jwt.size(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.REFRESH_TOKEN_SECRET, // secret key for signing the token
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d", // token expiry time, default is 7 days
        }
    )
}

export const User = mongoose.model("User", userSchema);