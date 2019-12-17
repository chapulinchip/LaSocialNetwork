const AppError = require('./AppError');
const httpCodes = require('../constants/httpResponseCodes');
const error = require('../constants/errors');

class UserNotFoundError extends AppError {
    constructor(message) {
        super(httpCodes.NOT_FOUND, error.USER_NOT_FOUND_ERROR, message | error.USER_NOT_FOUND_ERROR);
    }
}

module.exports = UserNotFoundError;