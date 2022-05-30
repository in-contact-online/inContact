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
     * @param {String} checkDate - check date
     * @returns {Promise<Object>}
     */
    async readByPhone({ phoneNumber, checkDate }) {
        return this.repository.status.readByPhoneAndTs({ phoneNumber, checkDate });
    }

    /**
     * @method
     * @param {String} params.phoneNumber - contact's phone number
     * @param {String} params.username - contact's username
     * @param {String} params.wasOnline - time which contact was online
     * @param {String} params.checkDate - time in moment of getting status
     * @returns {Promise<Object>}
     */
    async save(params) {
        return this.repository.status.save(params);
    }
}
