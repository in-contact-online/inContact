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
     * @param {Number} statusId - status identifier
     * @returns {Promise<Object>}
     */
    async read({ statusId }) {
        return this.repository.statuses.read({ statusId });
    }

    /**
     * @method
     * @param {String} fullName - contact's full name
     * @param {String} username - contact's username
     * @param {String} wasOnline - time which contact was online
     * @param {String} checkDate - time in moment of getting statuses
     * @returns {Promise<Object>}
     */
    async save(params) {
        return this.repository.statuses.save(params);
    }
}
