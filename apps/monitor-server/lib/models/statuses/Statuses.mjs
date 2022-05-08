import ModelBase from '../ModelBase.mjs';

export class Statuses extends ModelBase {
    /**
     * @typedef {Class} Statuses
     * @property readList
     */

    /**
     * @method
     * @param {Object} params - filter parameters
     * @param {Number} params.page - page number
     * @param {Number} params.size - page size
     * @param {String?} phoneNumber - tracked phone number
     * @param {String?} checkFrom - check time
     * @param {String?} checkTo - check time
     * @returns {Promise<Object>}
     */
    async readList(params) {
        return this.repository.status.readList(params);
    }

    /**
     * @method
     * @param {String?} phoneNumber - tracked phone number
     * @param {String?} checkFrom - check time
     * @param {String?} checkTo - check time
     * @returns {Promise<Object>}
    */
    async getTotal(params) {
        return this.repository.status.total(params);
    }
}
