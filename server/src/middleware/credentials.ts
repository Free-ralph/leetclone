import allowedOrigins from "../config/allowedOrigins.js";
import { Response, NextFunction, Request } from "express";

const credentials = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.set("Access-Control-Allow-Credentials", "true");
  }
  next();
};

export default credentials;
