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
     * @param {Number} userId - user identifier
     * @param {String} trackedPhone - user tracked phone
     * @returns {Promise<Object>}
     */
    async save(params) {
        return this.repository.contact.save(params);
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @param {String} trackedPhone - user tracked phone
     * @returns {Promise<Object>}
     */
    async activate(params) {
        return this.repository.contact.update({ ...params, tracked: true });
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @param {String} trackedPhone - user tracked phone
     * @returns {Promise<Object>}
     */
    async deactivate(params) {
        const contacts = await this.repository.contact.read(params);
        contacts[0].tracked = false;
        return this.repository.contact.update(contacts[0]);
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @returns {Promise<Object>}
     */
    async deactivateAll(params) {
        return this.repository.contact.updateTrackedList({ ...params, tracked: false });
    }
}
