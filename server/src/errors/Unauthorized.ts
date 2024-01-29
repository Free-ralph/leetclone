import { StatusCodes } from "http-status-codes";
import CustomError from "./customError.js";
export default class BadRequest extends CustomError {
  statusCode: number;
  constructor(msg: string) {
    super(msg);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
