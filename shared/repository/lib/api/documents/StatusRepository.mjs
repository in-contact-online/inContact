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
     * @param {String} checkDate - check date
     * @return {Promise<Object>} returns data saved in DB
     */
    async readByPhoneAndTs({ phoneNumber, checkDate }) {
        const sql = 'SELECT * FROM statuses WHERE phone_number = $1 AND check_date > $2 order by check_date asc';
        const params = [phoneNumber, checkDate];
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

    /**
     * @method
     * @param {Number} page - page number
     * @param {Number} size - page size
     * @param {String?} phoneNumber - tracked phone number
     * @param {String?} checkFrom - check time
     * @param {String?} checkTo - check time
     * @return {Promise<Object>} returns data saved in DB
     */
    async readList({ page, size, phoneNumber, checkFrom, checkTo }) {
        let whereStmt = '';

        if (phoneNumber) {
            whereStmt += `WHERE phone_number = '${phoneNumber}'`;
        }

        if (checkFrom) {
            whereStmt += whereStmt ? ` AND ` : `WHERE `;
            whereStmt += `check_date >= '${checkFrom}'`;
        }

        if (checkTo) {
            whereStmt += whereStmt ? ` AND ` : `WHERE `;
            whereStmt += `check_date <= '${checkTo}'`;
        }

        const sql = `SELECT * FROM statuses ${whereStmt} LIMIT ${size} OFFSET ${page * size}`;
        const result = await this.db.queryAsync(sql).catch((err) => {
            throw new RepoError(err);
        });
        return result && result.rows;
    }

    /**
     * @method
     * @param {String?} phoneNumber - tracked phone number
     * @param {String?} checkFrom - check time
     * @param {String?} checkTo - check time
     * @return {Promise<Object>} returns data saved in DB
     */
    async total({ phoneNumber, checkFrom, checkTo }) {
        let whereStmt = '';

        if (phoneNumber) {
            whereStmt += `WHERE phone_number = '${phoneNumber}'`;
        }

        if (checkFrom) {
            whereStmt += whereStmt ? ` AND ` : `WHERE `;
            whereStmt += `check_date >= '${checkFrom}'`;
        }

        if (checkTo) {
            whereStmt += whereStmt ? ` AND ` : `WHERE `;
            whereStmt += `check_date <= '${checkTo}'`;
        }
        const result = await this.db.queryAsync(`SELECT count(*) FROM statuses ${whereStmt}`).catch((err) => {
            throw new RepoError(err);
        });
        return result && Number(result.rows[0].count);
    }
}
