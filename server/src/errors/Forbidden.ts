import CustomError from "./customError.js"
import { StatusCodes } from "http-status-codes"

export default class Forbidden extends CustomError {
    statusCode : number
    constructor (msg : string){
        super(msg)
        this.statusCode = StatusCodes.FORBIDDEN
    }
} 