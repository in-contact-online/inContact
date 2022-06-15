import ModelBase from '../ModelBase.mjs';

export class UserTrackPhones extends ModelBase {
    /**
     * @typedef {Class} UserTrackPhones
     * @property listAll
     * @property listTracked
     * @property save
     * @property activate
     * @property deactivate
     */

    /**
     * @method
     * @param {Number} userId - user identifier
     * @returns {Promise<Object>}
     */
    async listAll({ userId }) {
        return this.repository.contact.read({ userId });
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @returns {Promise<Object>}
     */
    async listTracked({ userId }) {
        return this.repository.contact.read({ userId, tracked: true });
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @param {String} trackedPhone - tracked phone
     * @returns {Promise<Object>}
     */
    async readByPhone({ userId, trackedPhone }) {
        return this.repository.contact.readOne({ userId, trackedPhone });
    }

    /**
     * @method
     * @param {Object} params - user params
     * @param {Number} params.userId - user identifier
     * @param {String} params.trackedPhone - user tracked phone
     * @returns {Promise<Object>}
     */
    async save(params) {
        return this.repository.contact.save(params);
    }

    /**
     * @method
     * @param {Object} params - user params
     * @param {Number} params.userId - user identifier
     * @returns {Promise<Object>}
     */
    async markAsNotified(params) {
        return this.repository.contact.updateTrackedList({ ...params, notify: true });
    }

    /**
     * @method
     * @param {Object} params - user params
     * @param {Number} params.userId - user identifier
     * @param {String} params.trackedPhone - user tracked phone
     * @returns {Promise<Object>}
     */
    async activate(params) {
        return this.repository.contact.updateTrackedList({ ...params, tracked: true });
    }

    /**
     * @method
     * @param {Object} params - user params
     * @param {Number} params.userId - user identifier
     * @param {String} params.trackedPhone - user tracked phone
     * @returns {Promise<Object>}
     */
    async deactivate(params) {
        return this.repository.contact.updateTrackedList({ ...params, tracked: false });
    }

    /**
     * @method
     * @param {Object} params - user params
     * @param {Number} params.userId - user identifier
     * @returns {Promise<Object>}
     */
    async deactivateAll(params) {
        return this.repository.contact.updateTrackedList({ ...params, tracked: false });
    }
}
