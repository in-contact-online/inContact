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
        const result = await this.db.queryAsync('SELECT * FROM users WHERE user_id = $1', [userId]).catch((err) => {
            throw new RepoError(err);
        });
        return result && result.rows[0];
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @param {String} firstName - user first name
     * @param {String} lastName - user last name
     * @returns {Promise<Object>}
     */
     async save({ userId, firstName, lastName }) {
        const result = await this.db.queryAsync(
            'INSERT INTO users (user_id, first_name, second_name, active) VALUES ($1, $2, $3, $4)',
            [userId, firstName, lastName, true]).catch((err) => {
            throw new RepoError(err);
        });
        return result;
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @param {Boolean} active - user active status
     * @returns {Promise<Object>}
     */
     async update({ userId, active }) {
        const result = await this.db.queryAsync(
            'UPDATE users SET active = $1, updated_at = NOW() WHERE user_id = $2',
            [active, userId]).catch((err) => {
            throw new RepoError(err);
        });
        return result;
    }
}
