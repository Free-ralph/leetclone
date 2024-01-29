import CustomError from "./customError.js";
import { StatusCodes } from "http-status-codes";
export default class Forbidden extends CustomError {
    constructor(msg) {
        super(msg);
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}
//# sourceMappingURL=Forbidden.js.map