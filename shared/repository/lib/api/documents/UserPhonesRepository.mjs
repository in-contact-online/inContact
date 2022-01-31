import RepoBase from '../RepoBase.mjs';
import { RepoError } from '../models/index.mjs';

export class UserPhonesRepository extends RepoBase {
    /**
     * @typedef {Class} UserPhonesRepository
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
     * @param {string} userId - user identifier
     * @param {boolean} tracked - the flag that indicates do the phone is tracking
     * @return {Promise<Object>} returns data saved in DB
     */
    async read({ userId, tracked }) {
        let sql = 'SELECT * FROM tracked_phones WHERE user_id = $1';
        const params = [userId];
        if (typeof tracked === 'boolean') {
            sql += ' AND tracked = $2';
            params.push(tracked);
        }
        const result = await this.db.queryAsync(sql, params).catch((err) => {
            throw new RepoError(err);
        });
        return result && result.rows;
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @param {String} phone - tracked phone
     * @returns {Promise<Object>}
     */
    async save({ userId, phone }) {
        const result = await this.db
            .queryAsync('INSERT INTO tracked_phones (user_id, tracked_phone) VALUES ($1, $2)', [userId, phone])
            .catch((err) => {
                throw new RepoError(err);
            });
        return result;
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @param {String} phone - tracked phone
     * @param {Boolean} tracked - tracked status
     * @returns {Promise<Object>}
     */
    async update({ userId, phone, tracked }) {
        //todo: find out why no error on bad requests
        const result = await this.db
            .queryAsync(
                'UPDATE tracked_phones SET tracked = $1, updated_at = NOW() WHERE user_id = $2 AND tracked_phone = $3',
                [tracked, userId, phone]
            )
            .catch((err) => {
                throw new RepoError(err);
            });
        return result;
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @param {Boolean} tracked - tracked status
     * @returns {Promise<Object>}
     */
    async updateAll({ userId, tracked }) {
        const result = await this.db
            .queryAsync('UPDATE tracked_phones SET tracked = $1, updated_at = NOW() WHERE user_id = $2', [
                tracked,
                userId,
            ])
            .catch((err) => {
                throw new RepoError(err);
            });
        return result;
    }
}
