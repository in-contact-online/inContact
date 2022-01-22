export class RepoError extends Error {
    /**
     * @typedef {Class} RepoError
     * @property code
     * @property userMessage
     */

    /**
     * @param {String} message - Error message
     * @param {number} httpCode - HttpCode
     * @param {String} errorCode - application errorCode
     * @param {boolean} isOperational  - is operational error
     */
    constructor(
        message,
        httpCode = 500, // INTERNAL_SERVER_ERROR
        errorCode = 'INTERNAL_SERVER_ERROR',
        isOperational = false
    ) {
        super(message);

        Error.captureStackTrace(this);
        this.httpCode = httpCode;
        this.errorCode = errorCode;
        this.isOperational = isOperational;
        console.error('Error', this); // todo: debug level fails to log in console
    }

    get code() {
        return this.errorCode;
    }

    /**
     * @method
     * @return {Object<message{String}, code{String}>}
     */
    get userMessage() {
        return {
            message: this.message,
            code: this.errorCode || '',
        };
    }
}
