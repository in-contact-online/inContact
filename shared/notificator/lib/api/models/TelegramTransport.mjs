import TelegramBot from 'node-telegram-bot-api';

export class TelegramTransport {
    /**
     * @typedef {Class} TelegramTransport
     * @method send
     */

    #transport = null;

    /**
     * @param {Object} options - email service options
     * @param {String} options.token - telegram bot token
     */
    constructor(options) {
        if (options && options.token) {
            // polling should be false to be able to run second instance of the bot
            this.#transport = new TelegramBot(options.token, { polling: false });
        }
    }

    /**
     * @method
     * @param {Object} params - filter parameters
     * @param {Number} params.chatId - user-bot chat id
     * @param {Number} params.message - message text
     * @returns {Promise<void>}
     */
    async send(params) {
        try {
            await this.#transport.sendMessage(params.chatId, params.message, { parse_mode: 'HTML' });
        } catch (err) {
            console.error(err);
        }
    }
}
