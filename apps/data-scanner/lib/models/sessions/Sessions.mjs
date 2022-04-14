import { Client } from './Client.mjs';
import { humanReadableDate } from '../../utils/index.mjs';
import { Status } from '../status/index.mjs';
import { Session } from './Session.mjs';

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
        const sessions = await new Session().readAll();

        for (const session of sessions) {
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

            for (let user of result.users) {
                if (user.status) {
                    const wasOnline =
                        user.status.className === 'UserStatusOnline' ? null : humanReadableDate(user.status.wasOnline);

                    if (wasOnline !== undefined) {
                        const params = {
                            phoneNumber: user.phone,
                            username: user.username,
                            wasOnline,
                            checkDate: new Date().toISOString(),
                        };

                        await new Status().save(params);
                    }
                }
            }
        }
    }
}
