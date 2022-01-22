import RepoBase from '../RepoBase';
import { RepoError } from '../models';

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
     * @param {string} phone - users phone
     * @return {Promise<Object>} returns data saved in DB
     */
    async read({ phone }) {
        const result = await this.db.queryAsync('SELECT NOW();', [phone]).catch((err) => {
            throw new RepoError(err);
        });
        return result[0];
    }
}
