import RepoBase from '../RepoBase.mjs';
import { RepoError } from '../models/index.mjs';

export class StatusRepository extends RepoBase {
    /**
     * @typedef {Class} StatusRepository
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
     * @param {String} phoneNumber - contact's phone number
     * @return {Promise<Object>} returns data saved in DB
     */
    async readByPhone({ phoneNumber }) {
        let sql = 'SELECT * FROM statuses WHERE phone_number = $1';
        const params = [phoneNumber];
        const result = await this.db.queryAsync(sql, params).catch((err) => {
            throw new RepoError(err);
        });
        return result && result.rows;
    }

    /**
     * @method
     * @param {String} phoneNumber - contact's phone number
     * @param {String} username - contact's username
     * @param {String} wasOnline - time which contact was online
     * @param {String} checkDate - time in moment of getting statuses
     * @returns {Promise<Object>}
     */
    async save({ phoneNumber, username, wasOnline, checkDate }) {
        const result = await this.db
            .queryAsync(
                'INSERT INTO statuses (phone_number, username, was_online, check_date) VALUES ($1, $2, $3, $4)',
                [phoneNumber, username, wasOnline, checkDate]
            )
            .catch((err) => {
                throw new RepoError(err);
            });
        return result;
    }
}
