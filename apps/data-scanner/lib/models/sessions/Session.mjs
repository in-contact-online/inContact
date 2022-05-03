import ModelBase from '../ModelBase.mjs';

export class Session extends ModelBase {
    /**
     * @typedef {Class} Session
     * @property sessionId
     * @property readAll
     * @property save
     * @property update
     */

    /**
     * @method
     * @param {String} sessionId - session idetifier that equel phone number that activates the session
     * @returns {Promise<Object>}
     */
    async readBySessionId({ sessionId }) {
        return this.repository.session.readBySessionId({ sessionId });
    }

    /**
     * @method
     * @param {String} sessionId - session idetifier that equel phone number that activates the session
     * @param {Boolean} valid - if session is valid
     * @returns {Promise<Object>}
     */
    async update(params) {
        return this.repository.session.update(params);
    }

    /**
     * @method
     * @param {Boolean} valid - if session is valid
     * @returns {Promise<Object>}
     */
    async readAll(params) {
        return this.repository.session.readAll(params);
    }

    /**
     * @method
     * @param {String} sessionId - session idetifier that equel phone number that activates the session
     * @param {String} authKey - Telegram session authentication key
     * @param {String} dcId - Telegram DC ID
     * @param {String} serverAddress - Telegram session server address
     * @param {String} port - Telegram session port
     * @param {Boolean} valid - if session is valid
     * @returns {Promise<Object>}
     */
    async save(params) {
        return this.repository.session.save(params);
    }
}
