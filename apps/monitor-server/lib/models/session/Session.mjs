import ModelBase from '../ModelBase.mjs';

export class Session extends ModelBase {
    /**
     * @typedef {Class} Session
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
