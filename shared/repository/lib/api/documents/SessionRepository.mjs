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
     * @param {string} sessionId - identifier of session
     * @return {Promise<Object>} returns data saved in DB
     */
    async readBySessionId({ sessionId }) {
        const result = await this.db.queryAsync('SELECT * FROM sessions WHERE id = $1', [sessionId]).catch((err) => {
            throw new RepoError(err);
        });

        return result && result.rows[0];
    }

    /**
     * @method
     * @param {string} sessionId - identifier of session
     * @param {boolean} valid - is session valid
     * @return {Promise<Object>} returns data saved in DB
     */
    async update({ sessionId, valid }) {
        const sql = 'UPDATE sessions SET valid = $2 WHERE id = $1';

        const result = await this.db.queryAsync(sql, [sessionId, valid]).catch((err) => {
            throw new RepoError(err);
        });
        return result;
    }

    /**
     * @method
     * @param {boolean} valid - is session valid
     * @return {Promise<Object>} returns data saved in DB
     */
    async readAll({ valid }) {
        let sql = 'SELECT * FROM sessions WHERE valid = $1';

        const result = await this.db.queryAsync(sql, [valid]).catch((err) => {
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
     * @param {string} sessionId - identifier of session
     * @param {String} authKey - Telegram session authentication key
     * @param {String} dcId - Telegram DC ID
     * @param {String} serverAddress - Telegram session server address
     * @param {String} port - Telegram session port
     * @returns {Promise<Object>}
     */

    async save({ sessionId, authKey, dcId, serverAddress, port }) {
        const result = await this.db
            .queryAsync(
                'INSERT INTO sessions (id, auth_key, dc_id, server_address, port) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [sessionId, authKey, dcId, serverAddress, port]
            )
            .catch((err) => {
                throw new RepoError(err);
            });
        return result && result.rows[0];
    }

    /**
     * @method
     * @param {string} sessionId - identifier of session
     * @returns {Promise<Object>}
     */
    async remove({ sessionId}) {
        const result = await this.db
            .queryAsync('DELETE FROM sessions WHERE id = $1', [sessionId])
            .catch((err) => {
                throw new RepoError(err);
            });
        return result && result.rows[0];
    }
}
