import { StatusCodes } from "http-status-codes";
import { BadRequest, Unauthorized, Forbidden } from "../errors/index.js";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import Profile from "../model/Profile.js";
import RandomUser from "../model/RandomUser.js";
const login = async (req, res) => {
    const cookies = req.cookies;
    const { username, password } = req.body;
    if (!username || !password) {
        throw new BadRequest("Username or Password is required");
    }
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
        throw new Unauthorized("Invalid credentials");
    }
    const isPasswordCorrect = await foundUser.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new Unauthorized("Invalid Password");
    }
    const { refresh: newRefresh, access } = foundUser.CreateJWT();
    // we're basically going to check if there exist a token in there already, then we'll delete it an clear it out the db
    let newRefreshTokenArray = !cookies?.refresh
        ? foundUser.refreshToken
        : foundUser.refreshToken?.filter((rt) => rt !== cookies.refresh);
    if (cookies?.refresh) {
        /*  imagine a scenerio where a refresh token comes in at the time of login, it should mean it has never been used
            but if it has been used and cleared out, then it means it's been hacked and there's an attempted reuses
          */
        const oldRefresh = cookies.refresh;
        const foundToken = await User.findOne({ refreshToken: oldRefresh });
        if (!foundToken) {
            // we've dtected an invallid reuse
            newRefreshTokenArray = [];
        }
        res.clearCookie("refresh", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
    }
    foundUser.refreshToken = newRefreshTokenArray
        ? [...newRefreshTokenArray, newRefresh]
        : [newRefresh];
    const result = await foundUser.save();
    res.cookie("refresh", newRefresh, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
    });
    console.log(result);
    return res.status(StatusCodes.OK).json({ access });
};
const logout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refresh) {
        return res.sendStatus(StatusCodes.NO_CONTENT); // was succesfull , but we're not sending anything back
    }
    const refreshToken = cookies.refresh;
    const foundUser = await User.findOne({ refreshToken });
    if (foundUser) {
        const newRefreshTokenArray = foundUser.refreshToken
            ? foundUser.refreshToken.filter((rt) => rt !== refreshToken)
            : [];
        foundUser.refreshToken = newRefreshTokenArray;
        const result = await foundUser.save();
        console.log(result);
    }
    res.clearCookie("refresh", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });
    return res.sendStatus(StatusCodes.NO_CONTENT);
};
const register = async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        throw new BadRequest("Form Invalid");
    }
    await User.create({
        username,
        email,
        password,
    });
    res.status(StatusCodes.CREATED).json({ msg: `${username} Created` });
};
const getUser = async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new Unauthorized("Unauthorized, please log in again");
    }
    return res.status(StatusCodes.OK).json({ user });
};
const getUserProfile = async (req, res) => {
    const user = req.user;
    const userP = await User.findById(user?.userID);
    const userProfile = await Profile.findById(userP?.profile);
    return res.status(StatusCodes.OK).json({ userProfile });
};
const refreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refresh)
        throw new Unauthorized("Please provide refresh token");
    const refreshToken = cookies.refresh;
    res.clearCookie("refresh", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });
    const foundUser = await User.findOne({ refreshToken });
    // if we recieve a refresh token and no user is assiciated to the token, it has either been tampared with or
    // it has been used already
    if (!foundUser) {
        try {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
            const hackedUser = await User.findOne({
                username: payload?.username,
            });
            // if we get here the token, is ours, and it's not expired, then, this must be a hack attempt
            if (hackedUser) {
                hackedUser.refreshToken = [];
                await hackedUser.save();
            }
            throw new Forbidden("Unauthorized Access");
        }
        catch (err) {
            // if the token does'nt belong to us, we forbid it
            throw new Forbidden("Refresh Token invalid");
        }
    }
    const newRefreshTokenArray = foundUser.refreshToken
        ? foundUser.refreshToken.filter((rt) => rt !== refreshToken)
        : [];
    try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
        if (foundUser.username !== payload.username) {
            throw new Forbidden("Unauthorized Access");
        }
        // if we get here, it means the refresh token is still valid
        const { access, refresh: newRefresh } = foundUser.CreateJWT();
        foundUser.refreshToken = [...newRefreshTokenArray, newRefresh];
        await foundUser.save();
        res.cookie("refresh", newRefresh, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(StatusCodes.ACCEPTED).json({ access });
    }
    catch (err) {
        // here it means the refresh token is associated with a user, but has expired
        foundUser.refreshToken = [...newRefreshTokenArray];
        await foundUser.save();
        throw new Forbidden("Unauthorized Access, expired refresh token");
    }
};
const getRandomFakeUser = async (req, res) => {
    const rUsers = await RandomUser.find({ isUsed: false });
    if (rUsers.length == 0) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ msg: "no random users left" });
    }
    const rIdx = Math.floor(Math.random() * rUsers.length);
    return res.status(StatusCodes.OK).json({ randomFakeUser: rUsers[rIdx] });
};
const LoginWthRdomFakeUsr = async (req, res) => {
    const { params: { id }, cookies, } = req;
    const randomFakeUser = await RandomUser.findOne({ _id: id });
    if (randomFakeUser) {
        const randUser = await User.create({
            username: randomFakeUser.username,
            email: randomFakeUser.username + "@gmail.com",
            password: randomFakeUser.password,
        });
        randomFakeUser.isUsed = true;
        await randomFakeUser.save();
        const { refresh: newRefresh, access } = randUser.CreateJWT();
        if (cookies?.refresh) {
            res.clearCookie("refresh", {
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });
        }
        randUser.refreshToken = [newRefresh];
        await randUser.save();
        res.cookie("refresh", newRefresh, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(StatusCodes.OK).json({ access });
    }
};
export { login, register, getUser, refreshToken, logout, getUserProfile, getRandomFakeUser, LoginWthRdomFakeUsr, };
//# sourceMappingURL=authController.js.map