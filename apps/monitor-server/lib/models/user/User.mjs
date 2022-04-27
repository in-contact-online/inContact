import ModelBase from '../ModelBase.mjs';

export class User extends ModelBase {
    /**
     * @typedef {Class} User
     * @property readList
     */

    /**
     * @method
     * @param {String} params - filter parameters
     * @returns {Promise<Object>}
     */
    async readList(params) {
        console.log(params);
        return this.repository.session.readAll();
    }
}
