import RepoBase from '../RepoBase.mjs';
import { RepoError } from '../models/index.mjs';

export class StatusesRepository extends RepoBase {
    /**
     * @typedef {Class} StatusesRepository
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
     * @param {number} statusId - status identifier
     * @return {Promise<Object>} returns data saved in DB
     */
    async read({ statusId }) {
        let sql = 'SELECT * FROM statuses WHERE status_id = $1';
        const params = [statusId];
        const result = await this.db.queryAsync(sql, params).catch((err) => {
            throw new RepoError(err);
        });
        return result && result.rows;
    }

    /**
     * @method
     * @param {String} fullName - contact's full name
     * @param {String} username - contact's username
     * @param {String} wasOnline - time which contact was online
     * @param {String} checkDate - time in moment of getting statuses
     * @returns {Promise<Object>}
     */
    async save({ fullName, username, wasOnline, checkDate }) {
        const result = await this.db
            .queryAsync('INSERT INTO statuses (full_name, username, was_online, check_date) VALUES ($1, $2, $3, $4)', [
                fullName,
                username,
                wasOnline,
                checkDate,
            ])
            .catch((err) => {
                throw new RepoError(err);
            });
        return result;
    }
}
