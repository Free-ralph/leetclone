import mongoose, { Document } from "mongoose";
import { ProfileInterface } from "./Profile.js";

export interface ProblemInterface extends Document {
  title: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  likes: [ProfileInterface];
  dislikes: [ProfileInterface];
  order: number;
  videoID?: string;
  link?: string;
}

const ProblemSchema = new mongoose.Schema<ProblemInterface>(
  {
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
  },

  { toJSON: { virtuals: true }, toObject: { virtuals: true } } // enables us to use virtuals
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
