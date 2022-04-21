import {
    UserRepository,
    UserPhonesRepository,
    StatusRepository,
    SessionRepository,
    PhonesRepository,
} from './documents/index.mjs';

export class Repository {
    /**
     * @typedef {Class} Repository
     * @property user
     * @property userPhones
     * @property status
     * @property session
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
     * @type {StatusRepository} returns DB access to user statuses
     */
    status = null;

    /**
     * @type {SessionRepository} returns DB access to sessions
     */
    session = null;

    /**
     * @param {Object} options - repository options
     * @param {Object} options.db - postgres connection
     */
    constructor(options) {
        this.user = new UserRepository(options);
        this.userPhones = new UserPhonesRepository(options);
        this.status = new StatusRepository(options);
        this.session = new SessionRepository(options);
        this.phones = new PhonesRepository(options);
    }
}
