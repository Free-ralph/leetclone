import CustomError from "./customError.js"

export default class BadRequest extends CustomError {
    statusCode : number
    constructor (msg : string){
        super(msg)
        this.statusCode = 400
    }
} 