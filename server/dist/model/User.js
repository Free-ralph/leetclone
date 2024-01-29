import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Profile from "./Profile.js";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
        maxlength: 50,
        minlength: 3,
        unique: true,
    },
    profile: {
        type: mongoose.Schema.ObjectId,
        ref: "Profile",
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6,
    },
    refreshToken: [String], // we're using an array to store refresh token so we can have multiple device support
});
UserSchema.pre("save", async function () {
    if (this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        const profile = await Profile.create({ displayName: this.username });
        this.profile = profile._id;
    }
});
UserSchema.methods.CreateJWT = function () {
    const access = jwt.sign({ userID: this._id, username: this.username }, process.env.ACCESS_JWT_SECRET, { expiresIn: process.env.ACCESS_JWT_LIFETIME });
    const refresh = jwt.sign({ userID: this._id, username: this.username }, process.env.REFRESH_JWT_SECRET, { expiresIn: process.env.REFRESH_JWT_LIFETIME });
    return { refresh, access };
};
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};
export default mongoose.model("User", UserSchema);
//# sourceMappingURL=User.js.map