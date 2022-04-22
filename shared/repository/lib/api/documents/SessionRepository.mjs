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

    async readBySessionId({ sessionId }) {
        const result = await this.db.queryAsync('SELECT * FROM sessions WHERE id = $1', [sessionId]).catch((err) => {
            throw new RepoError(err);
        });
        return result && result.rows[0];
    }

    async update({ sessionId, full, valid }) {
        const result = await this.db
            .queryAsync('UPDATE sessions SET is_full = $1, valid = $2 WHERE id = $3', [full, valid, sessionId])
            .catch((err) => {
                throw new RepoError(err);
            });
        return result;
    }

    async readAll({ valid, full }) {
        let sql = 'SELECT * FROM sessions';
        const params = [];
        if (typeof valid === 'boolean') {
            sql += ' WHERE valid = $1';
            params.push(valid);
        }

        if (typeof full === 'boolean') {
            sql += ' AND is_full = $2';
            params.push(full);
        }

        const result = await this.db.queryAsync(sql, params).catch((err) => {
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

    async save({ sessionId, authKey, dcId, serverAddress, port, valid, full }) {
        const result = await this.db
            .queryAsync(
                'INSERT INTO sessions (id, auth_key, dc_id, server_address, port, valid, full) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [sessionId, authKey, dcId, serverAddress, port, valid, full]
            )
            .catch((err) => {
                throw new RepoError(err);
            });
        return result;
    }
}
