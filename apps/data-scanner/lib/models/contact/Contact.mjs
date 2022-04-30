import ModelBase from '../ModelBase.mjs';

export class Contact extends ModelBase {
    /**
     * @typedef {Class} Contact
     * @property getList
     * @property update
     */

    /**
     * @method
     * @param {boolean} tracked - flag that indicates is the contact tracked
     * @param {boolean} withSession - flag that indicates does contact have session
     * @returns {Promise<Object>}
     */
    async getList({ tracked, withSession }) {
        return await this.repository.contact.read({ tracked, withSession });
    }

    /**
     * @method
     * @param {String} trackedPhone - tracked phonenumber which session we should update
     * @param {String} sessionId - session identifier
     * @returns {Promise<Object>}
     */
    async update(params) {
        const contact = await this.repository.contact.readOne(params);
        contact.sessionId = params.sessionId;
        return this.repository.contact.updateSessionId(contact);
    }
}
