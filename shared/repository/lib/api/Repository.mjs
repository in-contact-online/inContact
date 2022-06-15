import { UserRepository, ContactRepository, StatusRepository, SessionRepository, ReportRepository } from './documents/index.mjs';

export class Repository {
    /**
     * @typedef {Class} Repository
     * @property user
     * @property contact
     * @property status
     * @property session
     */

    /**
     * @type {UserRepository} returns DB access to user
     */
    user = null;

    /**
     * @type {ContactRepository} returns DB access to user phonnes
     */
    contact = null;

    /**
     * @type {StatusRepository} returns DB access to user statuses
     */
    status = null;

    /**
     * @type {SessionRepository} returns DB access to sessions
     */
    session = null;

    /**
     * @type {ReportRepository} returns DB access to sessions
     */
    report = null;

    /**
     * @param {Object} options - repository options
     * @param {Object} options.db - postgres connection
     */
    constructor(options) {
        this.user = new UserRepository(options);
        this.contact = new ContactRepository(options);
        this.status = new StatusRepository(options);
        this.session = new SessionRepository(options);
        this.report = new ReportRepository(options);
    }
}
