import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"

const getAllQuestions : RequestHandler = (req, res) => {
    return res.status(StatusCodes.OK).json({"msg" : "All Leetcode questions"})
}

export {
    getAllQuestions
}