import mongoose, { Document } from "mongoose";
import { UserInterface } from "./User.js";
import { ProblemInterface } from "./Problem.js";

export interface ProfileInterface extends Document {
  displayName: string;
  likedProblems: ProblemInterface["_id"];
  dislikedProblems: ProblemInterface["_id"];
  starredProblems: ProblemInterface["_id"];
  solvedProblems: ProblemInterface["_id"];
  createdAt: string;
  updatedAt: string;
}

const ProfileSchema = new mongoose.Schema<ProfileInterface>(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model("Profile", ProfileSchema);
