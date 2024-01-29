import { RequestHandler } from "express";
import ProblemModel from "../model/Problem.js";
import Profile from "../model/Profile.js";
import { StatusCodes } from "http-status-codes";
import { RequestWithUser } from "../interfaces/Auth.interface.js";
import User from "../model/User.js";

const getAllProblems: RequestHandler = async (req, res) => {
  const problems = await ProblemModel.find({});

  return res
    .status(StatusCodes.OK)
    .json({ problems: problems, count: problems.length });
};

const addProblem: RequestHandler = async (req, res) => {
  const problem = await ProblemModel.create(req.body);
  return res.status(StatusCodes.CREATED).json({ problem });
};

const getProblem: RequestHandler = async (req, res) => {
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

const ToggleLikeProblem: RequestHandler = async (req: RequestWithUser, res) => {
  const {
    params: { pTitle },
    user,
  } = req;
  const userP = await User.findById(user?.userID);
  const problem = await ProblemModel.findOne({ title: pTitle });
  const userProfile = await Profile.findById(userP?.profile);
  if (userProfile?.likedProblems.includes(pTitle)) {
    userProfile.likedProblems = userProfile.likedProblems.filter(
      (problemTitle: string) => problemTitle !== problem?.title
    );
  } else {
    if (userProfile?.dislikedProblems.includes(pTitle)) {
      userProfile.dislikedProblems = userProfile.dislikedProblems.filter(
        (problemTitle: string) => problemTitle !== problem?.title
      );
    }
    userProfile?.likedProblems.push(problem?.title);
  }
  await userProfile?.save();

  return res.sendStatus(StatusCodes.NO_CONTENT);
};

const ToggleDislikeProblem: RequestHandler = async (
  req: RequestWithUser,
  res
) => {
  const {
    params: { pTitle },
    user,
  } = req;
  const userP = await User.findById(user?.userID);
  const problem = await ProblemModel.findOne({ title: pTitle });
  const userProfile = await Profile.findById(userP?.profile);

  if (userProfile?.dislikedProblems.includes(pTitle)) {
    userProfile.dislikedProblems = userProfile.dislikedProblems.filter(
      (problemTitle: string) => problemTitle !== problem?.title
    );
  } else {
    if (userProfile?.likedProblems.includes(pTitle)) {
      userProfile.likedProblems = userProfile.likedProblems.filter(
        (problemTitle: string) => problemTitle !== problem?.title
      );
    }
    userProfile?.dislikedProblems.push(problem?.title);
  }
  await userProfile?.save();

  return res.sendStatus(StatusCodes.NO_CONTENT);
};

const toggleFavouriteProblem: RequestHandler = async (
  req: RequestWithUser,
  res
) => {
  const {
    params: { pTitle },
    user,
  } = req;
  const userP = await User.findById(user?.userID);
  const problem = await ProblemModel.findOne({ title: pTitle });
  const userProfile = await Profile.findById(userP?.profile);

  if (userProfile?.starredProblems.includes(pTitle)) {
    userProfile.starredProblems = userProfile.likedProblems.filter(
      (problemTitle: string) => problemTitle !== problem?.title
    );
  } else {
    userProfile?.starredProblems.push(problem?.title);
  }
  await userProfile?.save();

  return res.sendStatus(StatusCodes.NO_CONTENT);
};

const addSolvedProblem: RequestHandler = async (req: RequestWithUser, res) => {
  const {
    params: { pTitle },
    user,
  } = req;

  const userP = await User.findById(user?.userID);
  const problem = await ProblemModel.findOne({ title: pTitle });
  const userProfile = await Profile.findById(userP?.profile);

  if (!userProfile?.solvedProblems.includes(pTitle)) {
    userProfile?.solvedProblems.push(problem?.title);
  }
  await userProfile?.save();

  return res.sendStatus(StatusCodes.NO_CONTENT);
};

const getSolvedProblems: RequestHandler = async (req: RequestWithUser, res) => {
  const { user } = req;
  const userP = await User.findById(user?.userID);
  const userProfile = await Profile.findById(userP?.profile);

  console.log("response", userProfile?.solvedProblems, userProfile);
  res.status(StatusCodes.OK).json({
    solvedProblems: userProfile?.solvedProblems,
  });
};

export {
  addProblem,
  getAllProblems,
  getProblem,
  ToggleLikeProblem,
  ToggleDislikeProblem,
  toggleFavouriteProblem,
  addSolvedProblem,
  getSolvedProblems,
};
