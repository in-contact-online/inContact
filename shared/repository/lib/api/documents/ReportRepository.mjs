import RepoBase from '../RepoBase.mjs';
import { RepoError } from '../models/index.mjs';

export class ReportRepository extends RepoBase {
    /**
     * @typedef {Class} ReportRepository
     */

    /**
     * @param {Object} options - repository options
     * @param {Object} options.db - database connection
     */
    constructor(options) {
        const { db } = options;

        super(db);
    }

    /**
     * @method
     * @param {Number} phone - phone number
     * @param {String} type - report type
     * @return {Promise<Object>} returns data saved in DB
     */
    async readList({ phone, type}) {
        const sql = `SELECT * FROM reports WHERE phone_number = ${phone} AND type = ${type};`;
        const result = await this.db.queryAsync(sql).catch((err) => {
            throw new RepoError(err);
        });
        return result && result.rows;
    }

    /**
     * @method
     * @param {Number} phone - phone number
     * @param {String} data - report data
     * @param {String} type - report type
     * @returns {Promise<Object>}
     */
    async save({ phone, data, type }) {
        const result = await this.db
            .queryAsync(
                'INSERT INTO reports (phone_number, data, type, created_at) VALUES ($1, $2, $3, $4)',
                [phone, data, type, new Date().toISOString()]
            )
            .catch((err) => {
                throw new RepoError(err);
            });
        return result;
    }
}
