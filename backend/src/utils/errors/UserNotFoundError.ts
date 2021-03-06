import error from "../constants/errors";
import {AppError} from "./AppError";
import httpCodes from "../constants/httpResponseCodes";

export class UserNotFoundError extends AppError {
    constructor(message = error.USER_NOT_FOUND_ERROR) {
        super(httpCodes.NOT_FOUND, error.USER_NOT_FOUND_ERROR, message);
    }
}