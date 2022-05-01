import RepoBase from '../RepoBase.mjs';
import { RepoError } from '../models/index.mjs';

export class SessionRepository extends RepoBase {
    /**
     * @typedef {Class} SessionRepository
     */

    /**
     * @param {Object} options - repository options
     * @param {Object} options.db - databse connection
     */
    constructor(options) {
        const { db } = options;

        super(db);
    }

    /**
     * @method
     * @param {String} phone - Phone nubmer that activates the session
     * @return {Promise<Object>} returns data saved in DB
     */
    async readByPhone({ phone }) {
        const result = await this.db.queryAsync('SELECT * FROM sessions WHERE id = $1', [phone]).catch((err) => {
            throw new RepoError(err);
        });
        return result && result.rows[0];
    }

    /**
     * @method
     * @return {Promise<Object>} returns data saved in DB
     */
    async readAll() {
        const result = await this.db.queryAsync('SELECT * FROM sessions').catch((err) => {
            throw new RepoError(err);
        });
        return result && result.rows;
    }

    /**
 * @method
 * @param {Number} page - page number
 * @param {Number} size - page size
 * @return {Promise<Object>} returns data saved in DB
 */
    async readList({ page, size }) {
        const sql = `SELECT * FROM sessions LIMIT ${size} OFFSET ${page * size}`;
        const result = await this.db.queryAsync(sql).catch((err) => {
            throw new RepoError(err);
        });
        return result && result.rows;
    }

    /**
     * @method
     * @return {Promise<Object>} returns data saved in DB
     */
    async total() {
        const result = await this.db.queryAsync('SELECT count(*) FROM sessions').catch((err) => {
            throw new RepoError(err);
        });
        return result && Number(result.rows[0].count);
    }

    /**
     * @method
     * @param {String} phone - Phone nubmer that activates the session
     * @param {String} authKey - Telegram session authentication key
     * @param {String} dcId - Telegram DC ID
     * @param {String} serverAddress - Telegram session server address
     * @param {String} port - Telegram session port
     * @returns {Promise<Object>}
     */
    async save({ phone, authKey, dcId, serverAddress, port }) {
        const result = await this.db
            .queryAsync(
                'INSERT INTO sessions (id, auth_key, dc_id, server_address, port) VALUES ($1, $2, $3, $4, $5)',
                [phone, authKey, dcId, serverAddress, port]
            )
            .catch((err) => {
                throw new RepoError(err);
            });
        return result;
    }
}
