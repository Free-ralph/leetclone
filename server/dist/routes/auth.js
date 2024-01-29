import express from "express";
import { register, login, getUser, refreshToken, logout, getUserProfile, getRandomFakeUser, LoginWthRdomFakeUsr } from "../controller/authController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/login", login);
router.get("/logout", logout);
router.post("/register", register);
router.get("/refresh", refreshToken);
router.get("/randomFakeUser", getRandomFakeUser);
router.get("/loginFakeUser/:id", LoginWthRdomFakeUsr);
router.get("/user", AuthMiddleware, getUser);
router.get("/profile", AuthMiddleware, getUserProfile);
export default router;
//# sourceMappingURL=auth.js.map