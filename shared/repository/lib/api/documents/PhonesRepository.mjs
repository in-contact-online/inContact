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
     * @param {String} tracked - flag for phone numbers which should be added to traking
     * @param {String} withSession - flag for phone numbers which have session field filled
     * @return {Promise<Object>} returns data saved in DB
     */
    async read({ tracked, withSession }) {
        let sql = 'SELECT * FROM tracked_phones WHERE tracked = $1 AND session_id';
        withSession ? (sql += ' IS NOT NULL') : (sql += ' IS NULL');

        const result = await this.db.queryAsync(sql, [tracked]).catch((err) => {
            throw new RepoError(err);
        });
        return result && result.rows;
    }

    /**
     * @method
     * @param {String} trackedPhone - tracked phonenumber which session we should update
     * @param {String} sessionId - session identifier
     * @returns {Promise<Object>}
     */
    async update({ trackedPhone, sessionId }) {
        const result = await this.db
            .queryAsync('UPDATE tracked_phones SET session_id = $1 WHERE tracked_phone = $2', [sessionId, trackedPhone])
            .catch((err) => {
                throw new RepoError(err);
            });
        return result;
    }
}
