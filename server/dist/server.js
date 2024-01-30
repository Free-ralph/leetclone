import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import connecDB from "./db/connectDB.js";
import errorHandlerMiddleware from "./middleware/errorMiddleware.js";
import AuthMiddleware from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
// routes
import AuthRoutes from "./routes/auth.js";
import QuestionRoute from "./routes/questions.js";
import ProblemRouter from "./routes/problem.js";
import corsOptions from "./config/corsOptions.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3500;
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
// app.use(credentials);
// Cross Origin Resource Sharing
app.use(cors(corsOptions));
// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
    return res.json("Hollo");
});
// routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/problem", ProblemRouter);
// Authentication middleware
app.use(AuthMiddleware);
app.use("/api/v1/questions", QuestionRoute);
// error handler middlware
app.use(errorHandlerMiddleware);
const start = async () => {
    try {
        await connecDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`server listening on port ${PORT}`);
        });
    }
    catch (err) {
        console.log(err);
    }
};
start();
//# sourceMappingURL=server.js.map