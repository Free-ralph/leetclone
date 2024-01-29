import CustomError from "./customError.js";
export default class BadRequest extends CustomError {
    constructor(msg) {
        super(msg);
        this.statusCode = 400;
    }
}
//# sourceMappingURL=BadRequest.js.map