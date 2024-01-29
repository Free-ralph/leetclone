import { StatusCodes } from "http-status-codes";
import CustomError from "./customError.js";
export default class BadRequest extends CustomError {
    constructor(msg) {
        super(msg);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}
//# sourceMappingURL=Unauthorized.js.map