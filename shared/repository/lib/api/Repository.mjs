import { UserRepository } from './documents';

export class Repository {
    /**
     * @typedef {Class} Repository
     * @property user
     */

    /**
     * @type {UserRepository} returns DB access to user
     */
    user = null;

    /**
     * @param {Object} options - repository options
     * @param {Object} options.db - postgres connection
     */
    constructor(options) {
        this.user = new UserRepository(options);
    }
}
