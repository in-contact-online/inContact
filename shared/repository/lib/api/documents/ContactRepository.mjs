import RepoBase from '../RepoBase.mjs';
import { RepoError } from '../models/index.mjs';

export class ContactRepository extends RepoBase {
    /**
     * @typedef {Class} ContactRepository
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
     * @param {number} userId - user identifier
     * @param {string} trackedPhone - contact added by user that should be tracked
     * @return {Promise<Object>} returns data saved in DB
     */
    async readOne({ userId, trackedPhone }) {
        const sql = 'SELECT * FROM tracked_phones WHERE user_id = $1 AND tracked_phone = $2';
        const params = [userId, trackedPhone];
        const result = await this.db.queryAsync(sql, params).catch((err) => {
            throw new RepoError(err);
        });
        return result && result.rows[0];
    }

    /**
     * @method
     * @param {number} params.userId - user identifier
     * @param {boolean} params.tracked - flag that indicates is the contact tracked
     * @param {string} params.trackedPhone - contact added by user that should be tracked
     * @param {string} params.sessionId - identifier of session that tracks this contact
     * @param {boolean} params.withSession - flag that indicates does contact have session
     * @return {Promise<Object>} returns data saved in DB
     */
    async read(params) {
        let sql = 'SELECT * FROM tracked_phones';
        let sqlParams = '';

        if (params) {
            const { userId, tracked, trackedPhone, sessionId, withSession } = params;

            if (userId) {
                sqlParams += ` user_id = ${userId}`;
            }

            if (typeof tracked === 'boolean') {
                sqlParams += sqlParams ? ' AND' : '';
                sqlParams += ` tracked = ${tracked}`;
            }

            if (trackedPhone) {
                sqlParams += sqlParams ? ' AND' : '';
                sqlParams += ` tracked_phone = '${trackedPhone}'`;
            }

            if (sessionId) {
                sqlParams += sqlParams ? ' AND' : '';
                sqlParams += ` session_id = '${sessionId}'`;
            }

            if (typeof withSession === 'boolean') {
                if (withSession) {
                    sqlParams += sqlParams ? ' AND' : '';
                    sqlParams += ' session_id IS NOT NULL';
                } else {
                    sqlParams += sqlParams ? ' AND' : '';
                    sqlParams += ' session_id IS NULL';
                }
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
     * @param {Number} userId - user identifier
     * @param {String} trackedPhone - contact added by user that should be tracked
     * @returns {Promise<Object>}
     */
    async save({ userId, trackedPhone }) {
        const result = await this.db
            .queryAsync('INSERT INTO tracked_phones (user_id, tracked_phone) VALUES ($1, $2)', [userId, trackedPhone])
            .catch((err) => {
                throw new RepoError(err);
            });
        return result;
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @param {String} trackedPhone - tracked phonenumber which session we should update
     * @param {Boolean} tracked - The flag that indicates is the contact tracked
     * @returns {Promise<Object>}
     */
    async updateTrackedList({ userId, trackedPhone, tracked }) {
        if ((userId || trackedPhone) && typeof tracked === 'boolean') {
            let params = '';

            if (userId) params += ` user_id = ${userId}`;
            if (trackedPhone) {
                if (params.length > 0) params += ' AND';
                params += ` tracked_phone = '${trackedPhone}'`;
            }

            const sql = `UPDATE tracked_phones SET tracked = ${tracked}` + ' WHERE' + params;

            const result = await this.db.queryAsync(sql).catch((err) => {
                throw new RepoError(err);
            });

            return result;
        }
    }

    /**
     * @method
     * @param {Number} userId - user idetifier
     * @param {String} trackedPhone - tracked phonenumber which session we should update
     * @param {String} sessionId - identifier of session that tracks this contact
     * @returns {Promise<Object>}
     */
    async updateSessionId({ userId, trackedPhone, sessionId }) {
        const result = await this.db
            .queryAsync('UPDATE tracked_phones SET session_id = $1 WHERE tracked_phone = $2 AND user_id = $3', [
                sessionId,
                trackedPhone,
                userId,
            ])
            .catch((err) => {
                throw new RepoError(err);
            });
        return result;
    }

    /**
     * @method
     * @param {String} sessionId - identifier of session that tracks this contact
     * @returns {Promise<Object>}
     */
    async removeSessionId({ sessionId }) {
        const result = await this.db
            .queryAsync('UPDATE tracked_phones SET session_id = null WHERE session_id = $1', [sessionId])
            .catch((err) => {
                throw new RepoError(err);
            });
        return result;
    }

    /**
     * @method
     * @param {Number} page - page number
     * @param {Number} size - page size
     * @return {Promise<Object>} returns data saved in DB
     */
    async readList({ page, size }) {
        const sql = `SELECT * FROM tracked_phones LIMIT ${size} OFFSET ${page * size}`;

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
        const result = await this.db.queryAsync('SELECT count(*) FROM tracked_phones').catch((err) => {
            throw new RepoError(err);
        });
        return result && Number(result.rows[0].count);
    }
}
