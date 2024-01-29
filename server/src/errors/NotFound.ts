import CustomError from "./customError.js";
export default class NotFound extends CustomError {
  statusCode: number;
  constructor(msg: string) {
    super(msg);
    this.statusCode = 404;
  }
}
