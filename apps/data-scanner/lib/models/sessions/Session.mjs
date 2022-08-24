import ModelBase from '../ModelBase.mjs';
import * as ConfigContainer from '../../config.cjs';

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
     * @param {Object} sessionId
     * @returns {Promise<Object>}
     */
    async invalidate(sessionId) {
        const systemUser = ConfigContainer.config.smtp.user;
        this.notificator.email.send({
            to: `${systemUser}, Jurchenko.A@gmail.com`,
            text: 'Session failed',
            subject: 'InContact. Failed session notification.',
            html: `<div>Session: ${sessionId} is failed. Time: ${new Date().toISOString()}</div>`,
        });
        return this.repository.session.update({ sessionId, valid: false });
    }

    /**
     * @method
     * @param {Object} params
     * @property {Boolean} valid - if session is valid
     * @returns {Promise<Object>}
     */
    async readAll(params) {
        return this.repository.session.readAll(params);
    }

    /**
     * @method
     * @param {Object} params - session
     * @property {String} sessionId - session idetifier that equel phone number that activates the session
     * @property {String} authKey - Telegram session authentication key
     * @property {String} dcId - Telegram DC ID
     * @property {String} serverAddress - Telegram session server address
     * @property {String} port - Telegram session port
     * @property {Boolean} valid - if session is valid
     * @returns {Promise<Object>}
     */
    async save(params) {
        return this.repository.session.save(params);
    }
}
