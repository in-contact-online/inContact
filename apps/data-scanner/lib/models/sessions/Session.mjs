import ModelBase from '../ModelBase.mjs';

export class Session extends ModelBase {
    /**
     * @typedef {Class} Session
     * @property readByPhone
     * @property save
     * @property update
     */

    /**
     * @method
     * @param {String} phone - Phone nubmer that activates the session
     * @returns {Promise<Object>}
     */
    async readByPhone({ phone }) {
        return this.repository.session.readByPhone({ phone });
    }

    /**
     * @method
     * @param {String} phone - Phone nubmer that activates the session
     * @param {String} authKey - Telegram session authentication key
     * @param {String} dcId - Telegram DC ID
     * @param {String} serverAddress - Telegram session server address
     * @param {String} port - Telegram session port
     * @param {String} active - Flag of session validation
     * @returns {Promise<Object>}
     */
    async save(params) {
        return this.repository.session.save(params);
    }
}
