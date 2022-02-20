import { v4 as uuidv4 } from 'uuid'
import { TelegramClientAdapter } from './TelegramClientAdapter.mjs'

export class Client {
    /**
     * @typedef {Class} Client
     * @method init
     * @method invoke
     * @property uid
    */

    /**
     * @property {Object|null}
     */
    #api = null;
    /**
     * @property {String|null}
     */
    #uid = null;

    /**
     * @param {Object} sessionConfig - Telegram command to be invoked
     * @param {String} sessionConfig.dc_id - Telegram DC ID
     * @param {String} sessionConfig.server_address - Telegram session server address
     * @param {Number} sessionConfig.port - Telegram session port
     * @param {String} sessionConfig.auth_key - Telegram session authentication key
     * @param {Object} apiConfig - Telegram api configuration
     * @param {String} apiConfig.apiId - Telegram Api id
     * @param {String} apiConfig.apiHash - Telegram Api hash
     */
    constructor(sessionConfig, apiConfig) {
        this.#uid = uuidv4();
        this.#api = new TelegramClientAdapter(sessionConfig, apiConfig);
    }

    /**
     * @method
     * @returns {Promise<void>}
     */
    async init() {
        await this.#api.connect();
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
    get uid() {
        return this.#uid;
    }
}
