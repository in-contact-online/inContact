import { UserRepository, UserPhonesRepository, StatusesRepository } from './documents/index.mjs';

export class Repository {
    /**
     * @typedef {Class} Repository
     * @property user
     * @property userPhones
     */

    /**
     * @type {UserRepository} returns DB access to user
     */
    user = null;
    /**
     * @type {UserPhonesRepository} returns DB access to user phonnes
     */
    userPhones = null;

    /**
     * @param {Object} options - repository options
     * @param {Object} options.db - postgres connection
     */
    constructor(options) {
        this.user = new UserRepository(options);
        this.userPhones = new UserPhonesRepository(options);
        this.statuses = new StatusesRepository(options);
    }
}
