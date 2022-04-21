import ModelBase from '../ModelBase.mjs';

export class Phones extends ModelBase {
    /**
     * @typedef {Class} Phones
     * @property getAddingList
     * @property getRemovingList
     * @property updateSession
     */

    /**
     * @method
     * @returns {Promise<Object>}
     */
    async getAddingList() {
        const phones = await this.repository.phones.read({ tracked: true });
        return phones.filter((phone) => !phone.session_id);
    }

    /**
     * @method
     * @returns {Promise<Object>}
     */
    async getRemovingList() {
        const phones = await this.repository.phones.read({ tracked: false });
        return phones.filter((phone) => phone.session_id);
    }

    /**
     * @method
     * @param {String} trackedPhoneId - tracked phone identifier
     * @param {String} sessionId - session identifier
     * @returns {Promise<Object>}
     */
    async updateSession(params) {
        return this.repository.session.update(params);
    }
}
