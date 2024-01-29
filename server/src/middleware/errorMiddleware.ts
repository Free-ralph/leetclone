import CustomError from "../errors/customError.js";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(",");
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    customError.msg = `No item found with id: ${err.value}`;
    customError.statusCode = 404;
  }
  console.log(customError)
  res.status(customError.statusCode).json({ msg: customError.msg });
};

export default  errorHandlerMiddleware;
