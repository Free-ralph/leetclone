import CustomError from "./customError.js";
export default class NotFound extends CustomError {
    constructor(msg) {
        super(msg);
        this.statusCode = 404;
    }
}
//# sourceMappingURL=NotFound.js.map