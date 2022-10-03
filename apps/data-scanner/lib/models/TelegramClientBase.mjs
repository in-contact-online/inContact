import {TelegramClient} from 'telegram/index.js';

export class TelegramClientBase extends TelegramClient {

    #config = null;

    constructor(session) {
        super(session, TelegramClientBase.config.apiId, TelegramClientBase.config.apiHash, {});
        this.#config = TelegramClientBase.config;
    }

    /**
     * @static
     * @method
     */
    static setConfig(config) {
        TelegramClientBase.config = config;
    }
}