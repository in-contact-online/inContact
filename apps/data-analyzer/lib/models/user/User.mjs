import ModelBase from '../ModelBase.mjs';

export class User extends ModelBase {
    /**
     * @typedef {Class} User
     * @property readList
     */

    /**
     * @method
     * @param {Number} page - page number
     * @param {Number} size - users per page
     * @returns {Promise<Object>}
     */
    async readList(params) {
        return this.repository.user.readList(params);
    }
}
