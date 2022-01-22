import { createMariaDbConnection, createRedisConnection } from '../../lib/db';
import * as ConfigContainer from '../../lib/config.cjs';

export class Repository {
    /**
     * @typedef {Class} Repository - repository interface for creation test prerequisites
     */

    #mariadb = null;

    #redis = null;

    constructor() {
        this.#mariadb = createMariaDbConnection({
            port: ConfigContainer.config.mariadb.port,
            host: ConfigContainer.config.mariadb.host,
            user: ConfigContainer.config.mariadb.user,
            database: ConfigContainer.config.mariadb.database,
            password: ConfigContainer.config.mariadb.password,
            connectionsLimit: ConfigContainer.config.mariadb.connectionsLimit,
        });

        this.#redis = createRedisConnection({
            port: ConfigContainer.config.redis.port,
            host: ConfigContainer.config.redis.host,
        });

        this.document = `${ConfigContainer.config.redis.prefix}:state`;
    }

    /**
     * @method
     * @param {Object} user
     * @param {String} user.email - user email
     * @param {String} user.uid - user uid
     * @return {Promise<Object>}
     */
    async createUser(user) {
        return this.#mariadb.queryAsync('INSERT INTO users (email, uid) VALUES (?, ?);', [user.email, user.uid]);
    }

    /**
     * @method
     * @param {String} email - user email
     * @return {Promise<Object>}
     */
    async deleteUser(email) {
        return this.#mariadb.queryAsync('DELETE FROM users where email = ?;', [email]);
    }

    /**
     * @method
     * @param {string} mac - hardware MAC address
     * @param {string} projectUid - project unique identifier
     * @param {string} companyUid - company unique identifier
     * @return {Promise<Object>} returns data saved in DB
     */
    async createNode({ mac, projectUid, companyUid }) {
        const fields = ['projectUid', projectUid, 'companyUid', companyUid];
        await this.#redis.hmset(`${this.document}:mac:${(mac || '').toUpperCase()}`, ...fields);
    }

    /**
     * @method
     * @param {String} mac - hardware MAC address
     * @return {Promise<Object>} returns data saved in DB
     */
    async deleteNode(mac) {
        await this.#redis.del(`${this.document}:mac:${mac}`);
    }

    /**
     * @method
     * @param {String} sql - sql statement
     * @return {Promise<Object>}
     */
    async runSql(sql) {
        return this.#mariadb.queryAsync(sql);
    }
}
