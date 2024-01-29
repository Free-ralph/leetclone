import ProblemModel from "../model/Problem.js";
import Profile from "../model/Profile.js";
import { StatusCodes } from "http-status-codes";
import User from "../model/User.js";
const getAllProblems = async (req, res) => {
    const problems = await ProblemModel.find({});
    return res
        .status(StatusCodes.OK)
        .json({ problems: problems, count: problems.length });
};
const addProblem = async (req, res) => {
    const problem = await ProblemModel.create(req.body);
    return res.status(StatusCodes.CREATED).json({ problem });
};
const getProblem = async (req, res) => {
    const { pTitle } = req.params;
    const problem = await ProblemModel.findOne({
        title: pTitle,
    })
        .populate("likes")
        .populate("dislikes");
    return res.status(StatusCodes.OK).json({
        problem,
    });
};
const ToggleLikeProblem = async (req, res) => {
    const { params: { pTitle }, user, } = req;
    const userP = await User.findById(user?.userID);
    const problem = await ProblemModel.findOne({ title: pTitle });
    const userProfile = await Profile.findById(userP?.profile);
    if (userProfile?.likedProblems.includes(pTitle)) {
        userProfile.likedProblems = userProfile.likedProblems.filter((problemTitle) => problemTitle !== problem?.title);
    }
    else {
        if (userProfile?.dislikedProblems.includes(pTitle)) {
            userProfile.dislikedProblems = userProfile.dislikedProblems.filter((problemTitle) => problemTitle !== problem?.title);
        }
        userProfile?.likedProblems.push(problem?.title);
    }
    await userProfile?.save();
    return res.sendStatus(StatusCodes.NO_CONTENT);
};
const ToggleDislikeProblem = async (req, res) => {
    const { params: { pTitle }, user, } = req;
    const userP = await User.findById(user?.userID);
    const problem = await ProblemModel.findOne({ title: pTitle });
    const userProfile = await Profile.findById(userP?.profile);
    if (userProfile?.dislikedProblems.includes(pTitle)) {
        userProfile.dislikedProblems = userProfile.dislikedProblems.filter((problemTitle) => problemTitle !== problem?.title);
    }
    else {
        if (userProfile?.likedProblems.includes(pTitle)) {
            userProfile.likedProblems = userProfile.likedProblems.filter((problemTitle) => problemTitle !== problem?.title);
        }
        userProfile?.dislikedProblems.push(problem?.title);
    }
    await userProfile?.save();
    return res.sendStatus(StatusCodes.NO_CONTENT);
};
const toggleFavouriteProblem = async (req, res) => {
    const { params: { pTitle }, user, } = req;
    const userP = await User.findById(user?.userID);
    const problem = await ProblemModel.findOne({ title: pTitle });
    const userProfile = await Profile.findById(userP?.profile);
    if (userProfile?.starredProblems.includes(pTitle)) {
        userProfile.starredProblems = userProfile.likedProblems.filter((problemTitle) => problemTitle !== problem?.title);
    }
    else {
        userProfile?.starredProblems.push(problem?.title);
    }
    await userProfile?.save();
    return res.sendStatus(StatusCodes.NO_CONTENT);
};
const addSolvedProblem = async (req, res) => {
    const { params: { pTitle }, user, } = req;
    const userP = await User.findById(user?.userID);
    const problem = await ProblemModel.findOne({ title: pTitle });
    const userProfile = await Profile.findById(userP?.profile);
    if (!userProfile?.solvedProblems.includes(pTitle)) {
        userProfile?.solvedProblems.push(problem?.title);
    }
    await userProfile?.save();
    return res.sendStatus(StatusCodes.NO_CONTENT);
};
const getSolvedProblems = async (req, res) => {
    const { user } = req;
    const userP = await User.findById(user?.userID);
    const userProfile = await Profile.findById(userP?.profile);
    console.log("response", userProfile?.solvedProblems, userProfile);
    res.status(StatusCodes.OK).json({
        solvedProblems: userProfile?.solvedProblems,
    });
};
export { addProblem, getAllProblems, getProblem, ToggleLikeProblem, ToggleDislikeProblem, toggleFavouriteProblem, addSolvedProblem, getSolvedProblems, };
//# sourceMappingURL=problemController.js.map