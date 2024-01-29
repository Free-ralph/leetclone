import express from "express"
import { 
    addProblem, getAllProblems, getProblem, ToggleLikeProblem, 
    ToggleDislikeProblem, toggleFavouriteProblem, addSolvedProblem, getSolvedProblems
} from "../controller/problemController.js"
import AuthMiddleware from "../middleware/authMiddleware.js";
const router = express.Router()

router.route("/").post(addProblem).get(getAllProblems)
router.route("/like/:pTitle").get(AuthMiddleware, ToggleLikeProblem)
router.route("/dislike/:pTitle").get(AuthMiddleware, ToggleDislikeProblem)
router.route("/favourite/:pTitle").get(AuthMiddleware, toggleFavouriteProblem)
router.route("/solved/:pTitle").get(AuthMiddleware, addSolvedProblem)
router.route("/solved-problems").get(AuthMiddleware, getSolvedProblems)

router.route("/:pTitle").get(getProblem)


export default router