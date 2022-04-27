import BaseError from './BaseError';

export class ValidationError extends BaseError {
    /**
     * @typedef {BaseError} ValidationError
     */

    constructor(error) {
        super(error, 422, 'VALIDATION_ERROR', true);
    }
}
