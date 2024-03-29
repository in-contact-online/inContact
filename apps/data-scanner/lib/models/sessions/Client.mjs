import { TelegramClientAdapter } from './TelegramClientAdapter.mjs';
import { Api } from 'telegram';

export class Client {
    /**
     * @typedef {Class} Client
     * @method init
     * @method invoke
     * @property sessionId
     * @property valid
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

    /**
     * @property {Boolean|null}
     */
    #valid = null;

    /**
     * @property {Number|null}
     */ #contactsCount = null;

    /**
     * @param {Object} session - Telegram command to be invoked
     * @param {Object} session.valid - is session valid
     * @param {String} session.id - Session identifier
     * @param {String} session.dc_id - Telegram DC ID
     * @param {String} session.server_address - Telegram session server address
     * @param {Number} session.port - Telegram session port
     * @param {String} session.auth_key - Telegram session authentication key
     */

    constructor(session) {
        this.#sessionId = session.id;
        this.#api = new TelegramClientAdapter(session);
        this.#valid = session.valid;
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

    get contactsCount() {
        return this.#contactsCount;
    }

    set contactsCount(value) {
        this.#contactsCount = value;
    }
}
