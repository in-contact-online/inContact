import { Client } from './Client.mjs';
import { writeToFile, readDir, readSqlite } from '../../utils/index.mjs';

export class Sessions {
    /**
     * @typedef {Class} Session
     * @method init
     * @method invokeEach
    */

    /**
     * @property {Object|null}
     */
    #config = null;

    /**
     * @property {Client[]}
     */
    #pool = [];

    /**
     * @param {Object} config - service configuration
     * @param {String} config.sessionsFolder - folder path with telegram sessions
     * @param {String} config.apiId - Telegram Api id
     * @param {String} config.apiHash - Telegram Api hash
     */
    constructor(config) {
        this.#config = config;
    }

    /**
     * @method
     * @returns {Promise<void>}
     */
    async init() {
        const sessionFiles = await readDir(this.#config.sessionsFolder, '.session');
        for (const sessionFile of sessionFiles) {
            const session = await readSqlite(sessionFile, 'sessions');
            const client = new Client(session, this.#config);
            await client.init();
            this.#pool.push(client);
        }
    }

    /**
     * @method
     * @param {Object} command - Telegram command to be invoked
     * @returns {Promise<void>}
     */
    async invokeEach(command) {
        for (const client of this.#pool) {
            const result = await client.invoke(command);
            await writeToFile(result.users);
        }
    }
}
