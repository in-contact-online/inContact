import { TelegramClientAdapter } from './TelegramClientAdapter.mjs';
import { Api } from 'telegram';

export class Client {
    /**
     * @typedef {Class} Client
     * @method init
     * @method invoke
     * @property sessionId
     * @property valid
     * @property isFull
     * @property contactsCount
     */

    /**
     * @property {Object|null}
     */
    #api = null;
    /**
     * @property {String|null}
     */
    #sessionId = null;
    #valid = null;
    #isFull = null;
    #contactsCount = null;

    /**
     * @param {Object} session - Telegram command to be invoked
     * @param {Object} session.valid - is session valid
     * @param {Object} session.is_full - is session full
     * @param {String} session.id - Session identifier
     * @param {String} session.dc_id - Telegram DC ID
     * @param {String} session.server_address - Telegram session server address
     * @param {Number} session.port - Telegram session port
     * @param {String} session.auth_key - Telegram session authentication key
     * @param {Object} apiConfig - Telegram api configuration
     * @param {String} apiConfig.apiId - Telegram Api id
     * @param {String} apiConfig.apiHash - Telegram Api hash

     */

    constructor(session, apiConfig) {
        this.#sessionId = session.id;
        this.#api = new TelegramClientAdapter(session, apiConfig);
        this.#valid = session.valid;
        this.#isFull = session.is_full;
    }

    /**
     * @method
     * @returns {Promise<void>}
     */
    async init() {
        await this.#api.connect();

        this.#contactsCount = (
            await this.#api.invoke(
                new Api.contacts.GetContacts({
                    hash: 0,
                })
            )
        ).users.length;
    }

    /**
     * @method
     * @param {Object} command - Telegram command to be invoked
     * @returns {Promise<Object>}
     */
    async invoke(command) {
        return this.#api.invoke(command);
    }

    /**
     * @property
     * @returns {String}
     */
    get sessionId() {
        return this.#sessionId;
    }

    get valid() {
        return this.#valid;
    }

    get isFull() {
        return this.#isFull;
    }

    get contactsCount() {
        return this.#contactsCount;
    }

    set isFull(value) {
        this.#isFull = value;
    }
}
