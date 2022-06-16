import RepoBase from '../RepoBase.mjs';
import { RepoError } from '../models/index.mjs';

export class UserRepository extends RepoBase {
    /**
     * @typedef {Class} UserRepository
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
     * @return {Promise<Object>} returns data saved in DB
     */
    async read({ userId }) {
        const result = await this.db.queryAsync('SELECT * FROM users WHERE id = $1', [userId]).catch((err) => {
            throw new RepoError(err);
        });
        return result && result.rows[0];
    }

    /**
     * @method
     * @param {Number} page - page number
     * @param {Number} size - page size

     * @return {Promise<Object>} returns data saved in DB
     */
    async readList({ page, size }) {
        let sql = `SELECT * FROM users LIMIT ${size} OFFSET ${page * size}`;

        const result = await this.db.queryAsync(sql).catch((err) => {
            throw new RepoError(err);
        });
        return result && result.rows;
    }

    /**
     * @method
     * @return {Promise<Number>} returns data saved in DB
     */
    async total() {
        const result = await this.db.queryAsync('SELECT count(*) FROM users').catch((err) => {
            throw new RepoError(err);
        });
        return result && Number(result.rows[0].count);
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @param {Number} chatId - chat identifier
     * @param {String} firstName - user first name
     * @param {String} lastName - user last name
     * @returns {Promise<Object>}
     */
    async save({ userId, firstName, lastName, chatId }) {
        const result = await this.db
            .queryAsync(
                'INSERT INTO users (id, first_name, second_name, active, chat_id) VALUES ($1, $2, $3, $4, $5)',
                [userId, firstName, lastName, true, chatId]
            )
            .catch((err) => {
                throw new RepoError(err);
            });
        return result;
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @param {Boolean} active - user active status
     * @param {String} email - user email
     * @returns {Promise<Object>}
     */
    async update({ userId, active, email }) {
        let values = '';
        if (typeof active === 'boolean') {
            values += `active = ${active}`;
        }
        if (email) {
            values += values ? `, email = '${email}'` : `email = '${email}'`;
        }

        return this.db
            .queryAsync(`UPDATE users SET ${values}, updated_at = NOW() WHERE id = ${userId}`)
            .catch((err) => {
                throw new RepoError(err);
            });
    }
}
