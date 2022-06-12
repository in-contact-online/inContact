import ModelBase from '../ModelBase.mjs';

export class User extends ModelBase {
    /**
     * @typedef {Class} User
     * @property read
     * @property save
     * @property update
     */

    /**
     * @method
     * @param {Number} userId - user identifier
     * @returns {Promise<Object>}
     */
    async read({ userId }) {
        return this.repository.user.read({ userId });
    }

    /**
     * @method
     * @param {Object} params - user identifier
     * @param {Number} params.userId - user identifier
     * @param {Number} params.chatId - chat identifier
     * @param {String} params.firstName - user first name
     * @param {String} params.lastName - user last name
     * @returns {Promise<Object>}
     */
    async save(params) {
        return this.repository.user.save(params);
    }

    /**
     * @method
     * @param {Object} params - user params
     * @param {Number} params.userId - user identifier
     * @param {String?} params.active - user active status
     * @param {String?} params.email - user email
     * @returns {Promise<Object>}
     */
    async update(params) {
        return this.repository.user.update(params);
    }
}
