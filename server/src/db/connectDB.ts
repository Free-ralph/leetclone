import mongoose from "mongoose";

export default function connecDB(uri: string) {
  return mongoose.connect(uri);
}
