import ModelBase from '../ModelBase.mjs';

export class Status extends ModelBase {
    /**
     * @typedef {Class} Status
     * @property read
     * @property save
     * @property update
     */

    /**
     * @method
     * @param {String} phoneNumber - contact's phone number
     * @returns {Promise<Object>}
     */
    async readByPhone({ phoneNumber }) {
        return this.repository.status.readByPhone({ phoneNumber });
    }

    /**
     * @method
     * @param {String} phoneNumber - contact's phone number
     * @param {String} username - contact's username
     * @param {String} wasOnline - time which contact was online
     * @param {String} checkDate - time in moment of getting status
     * @returns {Promise<Object>}
     */
    async save(params) {
        return this.repository.status.save(params);
    }
}
