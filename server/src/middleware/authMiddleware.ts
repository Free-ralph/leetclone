import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Unauthorized } from "../errors/index.js";
import { RequestWithUser } from "../interfaces/Auth.interface.js"

export default function AuthMiddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthorized("No Authentication token provided");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_JWT_SECRET!, (err, decoded) => {
    if (err) {
      throw new Unauthorized("Unauthorized");
    }
    req.user = decoded as { username: string; userID: string };
    next();
  });
}
