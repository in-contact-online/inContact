import BaseError from './BaseError';

export class DbError extends BaseError {
    /**
     * @typedef {BaseError} DbError
     */

    constructor(error) {
        super(error, 500, 'DATABASE_ERROR', true);
    }
}
