import ModelBase from '../ModelBase.mjs';

export class Session extends ModelBase {
    /**
     * @typedef {Class} Session
     * @property readList
     */

    /**
     * @method
     * @param {Object} params - filter parameters
     * @param {Number} params.page - page number
     * @param {Number} params.size - page size
     * @returns {Promise<Object>}
     */
    async readList(params) {
        return this.repository.session.readList(params);
    }

    /**
     * @method
     * @returns {Promise<Object>}
    */
    async getTotal() {
        return this.repository.session.total();
    }
}
