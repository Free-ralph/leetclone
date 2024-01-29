import express from "express";
import { getAllQuestions } from "../controller/questions.js";
const router = express.Router();
router.route("/").get(getAllQuestions);
export default router;
//# sourceMappingURL=questions.js.map