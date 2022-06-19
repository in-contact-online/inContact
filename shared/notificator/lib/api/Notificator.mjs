import { EmailTransport, TelegramTransport } from './models/index.mjs';

export class Notificator {
    /**
     * @typedef {Class} Notificator
     * @property email
     * @property bot
     */

    /**
     * @type {EmailTransport} returns email transport
     */
    email = null;

    /**
     * @type {TelegramTransport} returns text transport
     */
    bot = null;

    /**
     * @param {Object} options - email service options
     * @param {Object} options.smtp - SMTP server connection options
     * @param {Object} options.telegram - telegram bot options
     * @return {Object} - Notificator API
     */
    constructor(options) {
        this.email = new EmailTransport(options.smtp);
        this.bot = new TelegramTransport(options.telegram);
    }
}
