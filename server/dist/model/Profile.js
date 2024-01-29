import mongoose from "mongoose";
const ProfileSchema = new mongoose.Schema({
    displayName: String,
    likedProblems: [
        {
            type: String,
            ref: "Problem",
        },
    ],
    dislikedProblems: [
        {
            type: String,
            ref: "Problem",
        },
    ],
    starredProblems: [
        {
            type: String,
            ref: "Problem",
        },
    ],
    solvedProblems: [
        {
            type: String,
            ref: "Problem",
        },
    ],
}, { timestamps: true });
export default mongoose.model("Profile", ProfileSchema);
//# sourceMappingURL=Profile.js.map