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
     * @param {Object} options - email service options
     * @param {Object} options.smtp - SMTP server connection options
     * @return {Object} - Notificator API
     */
    constructor(options) {
        this.email = new EmailTransport(options.smtp);
        this.text = new TextTransport(options.smtp);
    }
}
