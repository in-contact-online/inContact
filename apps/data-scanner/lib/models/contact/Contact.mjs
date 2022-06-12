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
     * @param {String} trackedPhone - tracked phonenumber
     * @returns {Promise<Object>}
     */
    async getTrackedByPhone({ trackedPhone }) {
        const contacts = await this.repository.contact.read({ trackedPhone });
        return contacts.filter((contact) => contact.session_id && contact.tracked);
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @param {String} trackedPhone - tracked phonenumber which session we should update
     * @param {String} sessionId - session identifier
     * @returns {Promise<Object>}
     */
    async updateSession({ userId, trackedPhone, sessionId }) {
        return this.repository.contact.updateSessionId({ userId, trackedPhone, sessionId });
    }

    /**
     * @method
     * @param {String} sessionId - session identifier
     * @returns {Promise<Object>}
     */
    async removeSessionId({ sessionId }) {
        return this.repository.contact.removeSessionId({ sessionId });
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @param {String} trackedPhone - tracked phonenumber which session we should update
     * @param {Boolean} tracked - is phone number tracked
     * @returns {Promise<Object>}
     */
    async updateTrackedStatus({ userId, trackedPhone, tracked }) {
        return this.repository.contact.updateTrackedList({ userId, trackedPhone, tracked });
    }

    /**
     * @method
     * @param {Object} params - user params
     * @param {String} params.trackedPhone - tracked phone number which session we should update
     * @returns {Promise<Object>}
     */
    async notifyTrackedOnline({ trackedPhone }) {
        const contacts = await this.repository.contact.read({ trackedPhone, notify: true });
        for (const contact of contacts) {
            if (contact.notify) {
                await this.repository.contact.updateTrackedList({ userId: contact.user_id, trackedPhone, notify: false });
                const user = await this.repository.user.read({ userId: contact.user_id });
                if (user.email) {
                    await this.notificator.email.send({
                        to: user.email,
                        text: `Tracked contact ${trackedPhone} is online`,
                        subject: 'Tracked contact is online'
                    });
                } else {
                    console.warn('User has no email');
                }
            }
        }
    }
}
