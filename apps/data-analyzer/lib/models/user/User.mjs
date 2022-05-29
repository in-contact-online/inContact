import ModelBase from '../ModelBase.mjs';

export class User extends ModelBase {
    /**
     * @typedef {Class} User
     * @property readList
     */

    /**
     * @method
     * @param {Number} params.page - page number
     * @param {Number} params.size - users per page
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
