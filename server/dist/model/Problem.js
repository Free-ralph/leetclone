import mongoose from "mongoose";
const ProblemSchema = new mongoose.Schema({
    title: {
        required: [true, "please provide a title"],
        type: String,
        maxlength: 100,
        minlength: 5,
        trim: true,
    },
    category: {
        type: String,
        required: [true, "please provide a category"],
        minlength: 3,
        maxlength: 50,
    },
    difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        default: "easy",
    },
    order: Number,
    videoID: String,
    link: String,
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } } // enables us to use virtuals
);
ProblemSchema.virtual("likes", {
    ref: "Profile",
    localField: "title",
    foreignField: "likedProblems",
    justOne: false,
});
ProblemSchema.virtual("dislikes", {
    ref: "Profile",
    localField: "title",
    foreignField: "dislikedProblems",
    justOne: false,
});
ProblemSchema.virtual("solvedProblems", {
    ref: "Profile",
    localField: "title",
    foreignField: "solvedProblems",
    justOne: false,
});
export default mongoose.model("Problem", ProblemSchema);
//# sourceMappingURL=Problem.js.map