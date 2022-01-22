import ModelBase from '../ModelBase';

export class User extends ModelBase {
    /**
     * @typedef {Class} User
     * @property read
     */

    /**
     * @method
     * @param {string} phone - users phone number
     * @returns {Promise<Object>}
     */
    async read(phone) {
        return this.repository.user.read({ phone });
    }
}
