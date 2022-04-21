import RepoBase from '../RepoBase.mjs';
import { RepoError } from '../models/index.mjs';

export class PhonesRepository extends RepoBase {
    /**
     * @typedef {Class} PhonesRepository
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
     * @param {boolean} tracked - the flag that indicates do the phone is tracking
     * @return {Promise<Object>} returns data saved in DB
     */
    async read({ tracked }) {
        let sql = 'SELECT * FROM tracked_phones';
        const params = [];
        if (typeof tracked === 'boolean') {
            sql += ' WHERE tracked = $1';
            params.push(tracked);
        }
        const result = await this.db.queryAsync(sql, params).catch((err) => {
            throw new RepoError(err);
        });
        return result && result.rows;
    }

    /**
     * @method
     * @param {String} trackedPhoneId - tracked phone identifier
     * @param {String} sessionId - session identifier
     * @returns {Promise<Object>}
     */
    async update({ trackedPhoneId, sessionId }) {
        const result = await this.db
            .queryAsync('UPDATE tracked_phones SET session_id = $1 WHERE id = $2', [sessionId, trackedPhoneId])
            .catch((err) => {
                throw new RepoError(err);
            });
        return result;
    }
}
