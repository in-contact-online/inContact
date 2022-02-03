import BaseError from './BaseError';
import logger from '../../api/logger';

export class NotImplemented extends BaseError {
    /**
     * @typedef {BaseError} NotFoundError
     */

    constructor(error) {
        super(error);

        this._code = null;
        logger.debug('NotImplemented', this);
    }

    /**
     * @method
     * @return {String}
     */
    get code() {
        return this._code;
    }
}
