import ModelBase from '../ModelBase.mjs';

export class Contact extends ModelBase {
    /**
     * @typedef {Class} Contact
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
