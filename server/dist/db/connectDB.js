import mongoose from "mongoose";
export default function connecDB(uri) {
    return mongoose.connect(uri);
}
//# sourceMappingURL=connectDB.js.map