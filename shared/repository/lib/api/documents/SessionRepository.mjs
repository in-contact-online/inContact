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
     * @param {boolean} isFull - is session full of contacts
     * @param {boolean} valid - is session valid
     * @return {Promise<Object>} returns data saved in DB
     */
    async update({ sessionId, isFull, valid }) {
        if ((typeof isFull === 'boolean' || typeof valid === 'boolean') && sessionId) {
            let params = '';

            if (typeof isFull === 'boolean') params += ` is_full = ${isFull}`;
            if (typeof valid === 'boolean') {
                if (params.length > 0) params += ',';
                params += ` valid = ${valid}`;
            }

            const sql = 'UPDATE sessions SET' + params + ` WHERE id = ${sessionId}`;

            const result = await this.db.queryAsync(sql).catch((err) => {
                throw new RepoError(err);
            });
            return result;
        }
    }

    /**
     * @method
     * @param {boolean} isFull - is session full of contacts
     * @param {boolean} valid - is session valid
     * @return {Promise<Object>} returns data saved in DB
     */
    async readAll(params) {
        let sql = 'SELECT * FROM sessions';
        let sqlParams = '';

        if (params) {
            const { valid, isFull } = params;

            if (typeof valid === 'boolean') {
                sqlParams += ` valid = ${valid}`;
            }

            if (typeof isFull === 'boolean') {
                sqlParams += sqlParams ? ' AND' : '';
                sqlParams += ` is_full = ${isFull}`;
            }

            if (sqlParams !== '') sql += ' WHERE' + sqlParams;
        }

        const result = await this.db.queryAsync(sql).catch((err) => {
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
     * @param {string} sessionId - identifier of session
     * @param {String} authKey - Telegram session authentication key
     * @param {String} dcId - Telegram DC ID
     * @param {String} serverAddress - Telegram session server address
     * @param {String} port - Telegram session port
     * @returns {Promise<Object>}
     */

    async save({ sessionId, authKey, dcId, serverAddress, port, valid, isFull }) {
        const result = await this.db
            .queryAsync(
                'INSERT INTO sessions (id, auth_key, dc_id, server_address, port, valid, is_full) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [sessionId, authKey, dcId, serverAddress, port, valid, isFull]
            )
            .catch((err) => {
                throw new RepoError(err);
            });
        return result;
    }
}
