import ModelBase from '../ModelBase.mjs';

export class Contact extends ModelBase {
    /**
     * @typedef {Class} Contact
     * @property getList
     * @property update
     */

    /**
     * @method
     * @param {String} userId - user identifier
     * @returns {Promise<Object>}
     */
    async getTrackedByUser({ userId }) {
        return await this.repository.contact.read({ userId });
    }
}
