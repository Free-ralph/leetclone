import { StatusCodes } from "http-status-codes";
const getAllQuestions = (req, res) => {
    return res.status(StatusCodes.OK).json({ "msg": "All Leetcode questions" });
};
export { getAllQuestions };
//# sourceMappingURL=questions.js.map