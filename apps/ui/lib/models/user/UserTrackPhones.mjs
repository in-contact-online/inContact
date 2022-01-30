import ModelBase from '../ModelBase.mjs';

export class UserTrackPhones extends ModelBase {
    /**
     * @typedef {Class} User
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
        return this.repository.userPhones.read({ userId });
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @returns {Promise<Object>}
     */
     async listTracked({ userId }) {
        return this.repository.userPhones.read({ userId, tracked: true });
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @param {String} phone - user tracked phone
     * @returns {Promise<Object>}
     */
     async save(params) {
        return this.repository.userPhones.save(params);
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @param {String} phone - user tracked phone
     * @returns {Promise<Object>}
     */
     async activate(params) {
        return this.repository.userPhones.update({...params, tracked: true});
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @param {String} phone - user tracked phone
     * @returns {Promise<Object>}
     */
     async deactivate(params) {
        return this.repository.userPhones.update({...params, tracked: false});
    }
}
