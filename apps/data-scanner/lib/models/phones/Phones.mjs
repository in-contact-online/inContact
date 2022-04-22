import ModelBase from '../ModelBase.mjs';

export class Phones extends ModelBase {
    /**
     * @typedef {Class} Phones
     * @property getList
     * @property updateSession
     */

    /**
     * @method
     * @param {String} tracked - flag for phone numbers which should be added to traking
     * @param {String} withSession - flag for phone numbers which have session field filled
     * @returns {Promise<Object>}
     */
    async getList({ tracked, withSession }) {
        return await this.repository.phones.read({ tracked, withSession });
    }

    /**
     * @method
     * @param {String} trackedPhone - tracked phonenumber which session we should update
     * @param {String} sessionId - session identifier
     * @returns {Promise<Object>}
     */
    async updateSession(params) {
        return this.repository.phones.update(params);
    }
}
