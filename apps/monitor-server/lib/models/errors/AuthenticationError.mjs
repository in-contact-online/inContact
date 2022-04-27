import BaseError from './BaseError';

export class AuthenticationError extends BaseError {
    /**
     * @typedef {BaseError} AuthenticationError
     */

    constructor(error) {
        super(error, 401, 'AUTHENTICATION_ERROR', true);
    }
}
