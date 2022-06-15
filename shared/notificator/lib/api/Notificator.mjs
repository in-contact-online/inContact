import { EmailTransport, TextTransport } from './models/index.mjs';

export class Notificator {
    /**
     * @typedef {Class} Notificator
     * @property email
     * @property text
     */

    /**
     * @type {EmailTransport} returns email transport
     */
    email = null;

    /**
     * @type {TextTransport} returns text transport
     */
    text = null;

    /**
     * @param {Object} options - smtp options
     * @param {String} options.host - email sending host
     * @param {Number} options.port - email sending port
     * @param {String} options.user - email service user
     * @param {String} options.password - email service password
     * @param {String} options.from - sender address
     * @return {Object} - Notificator API
     */
    constructor(options) {
        this.email = new EmailTransport(options);
        this.text = new TextTransport(options);
    }
}
