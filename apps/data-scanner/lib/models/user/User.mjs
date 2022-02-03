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
     * @param {Number} userId - user identifier
     * @param {String} firstName - user first name
     * @param {String} lastName - user last name
     * @returns {Promise<Object>}
     */
    async save(params) {
        return this.repository.user.save(params);
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @param {String} active - user active status
     * @returns {Promise<Object>}
     */
     async update(params) {
        return this.repository.user.update(params);
    }
}
