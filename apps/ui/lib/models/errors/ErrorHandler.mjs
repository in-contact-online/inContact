import logger from '../../api/logger';

export class ErrorHandler {
    static handleInternalError(err) {
        if (err.message && err.stack) {
            logger.error(`[ErrorHandler] ${err.message}, ${err.stack}`);
        } else {
            logger.error(`[ErrorHandler] ${err}`);
        }
    }

    static handleRequestError(res, err, next) {
        if (!res || !err) {
            return undefined;
        }
        if (!err.isOperational) {
            ErrorHandler.handleInternalError(err);
        }
        next(err);
    }
}
