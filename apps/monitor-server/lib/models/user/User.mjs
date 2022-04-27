import ModelBase from '../ModelBase.mjs';

export class User extends ModelBase {
    /**
     * @typedef {Class} User
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
        return this.repository.user.readList(params);
    }

    /**
     * @method
     * @returns {Promise<Object>}
     */
     async getTotal() {
        return this.repository.user.total();
    }
}
