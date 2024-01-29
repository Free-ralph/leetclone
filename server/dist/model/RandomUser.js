import mongoose from "mongoose";
const RandomUserSchems = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username required"],
    },
    password: {
        type: String,
        required: [true, "password requried"],
    },
    displayName: {
        type: String,
        required: [true, "displat name requried"],
    },
    isUsed: {
        type: Boolean,
        default: false,
    },
});
export default mongoose.model("RandomUser", RandomUserSchems);
//# sourceMappingURL=RandomUser.js.map