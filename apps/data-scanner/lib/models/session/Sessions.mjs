import { Client } from './Client.mjs';
import { writeToFile, readDir, readSqlite, humanReadableDate } from '../../utils/index.mjs';
import { Statuses } from '../statuses/Statuses.mjs';

export class Sessions {
    /**
     * @typedef {Class} Sessions
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
            // await writeToFile(result.users);

            for (let user of result.users) {
                const currentDate = new Date().toISOString();
                const wasOnline =
                    user.status.className === 'UserStatusOnline'
                        ? currentDate
                        : humanReadableDate(user.status.wasOnline);

                const params = {
                    phoneNumber: user.phone,
                    username: user.username,
                    wasOnline,
                    checkDate: currentDate,
                };

                await new Statuses().save(params);
            }
        }
    }
}
