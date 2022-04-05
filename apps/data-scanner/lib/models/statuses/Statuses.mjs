import ModelBase from '../ModelBase.mjs';

export class Statuses extends ModelBase {
    /**
     * @typedef {Class} Statuses
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
        return this.repository.statuses.readByPhone({ phoneNumber });
    }

    /**
     * @method
     * @param {String} phoneNumber - contact's phone number
     * @param {String} username - contact's username
     * @param {String} wasOnline - time which contact was online
     * @param {String} checkDate - time in moment of getting statuses
     * @returns {Promise<Object>}
     */
    async save(params) {
        return this.repository.statuses.save(params);
    }
}
