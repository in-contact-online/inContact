import RepoBase from '../RepoBase.mjs';
import { RepoError } from '../models/index.mjs';

export class ContactRepository extends RepoBase {
    /**
     * @typedef {Class} ContactRepository
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
     * @param {number} userId - user identifier
     * @param {string} trackedPhone - contact added by user that should be tracked
     * @return {Promise<Object>} returns data saved in DB
     */
    async readOne({ userId, trackedPhone }) {
        const sql = 'SELECT * FROM tracked_phones WHERE user_id = $1 AND tracked_phone = $2';
        const params = [userId, trackedPhone];
        const result = await this.db.queryAsync(sql, params).catch((err) => {
            throw new RepoError(err);
        });
        return result && result.rows[0];
    }

    /**
     * @method
     * @param {number} userId - user identifier
     * @param {boolean} tracked - flag that indicates is the contact tracked
     * @param {string} trackedPhone - contact added by user that should be tracked
     * @param {string} sessionId - identifier of session that tracks this contact
     * @param {boolean} withSession - flag that indicates does contact have session
     * @return {Promise<Object>} returns data saved in DB
     */
    async read({ userId, tracked, trackedPhone, sessionId, withSession }) {
        let sql = 'SELECT * FROM tracked_phones';
        let params = '';

        if (typeof userId === 'number') {
            params += ` user_id = ${userId}`;
        }

        if (typeof tracked === 'boolean') {
            params !== '' ? (params += ` AND tracked = ${tracked}`) : (params += ` tracked = ${tracked}`);
        }

        if (typeof trackedPhone === 'string') {
            params !== ''
                ? (params += ` AND tracked_phone = ${trackedPhone}`)
                : (params += ` tracked_phone = ${trackedPhone}`);
        }

        if (typeof sessionId === 'string') {
            params !== '' ? (params += ` AND session_id = ${sessionId}`) : (params += ` session_id = ${sessionId}`);
        }

        if (typeof withSession === 'boolean') {
            if (withSession) {
                params !== '' ? (params += ' AND session_id IS NOT NULL') : (params += ' session_id IS NOT NULL');
            } else {
                params !== '' ? (params += ' AND session_id IS NULL') : (params += ' session_id IS NULL');
            }
        }

        if (params !== '') sql += ' WHERE' + params;

        const result = await this.db.queryAsync(sql).catch((err) => {
            throw new RepoError(err);
        });
        return result && result.rows;
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @param {String} trackedPhone - contact added by user that should be tracked
     * @returns {Promise<Object>}
     */
    async save({ userId, trackedPhone }) {
        const result = await this.db
            .queryAsync('INSERT INTO tracked_phones (user_id, tracked_phone) VALUES ($1, $2)', [userId, trackedPhone])
            .catch((err) => {
                throw new RepoError(err);
            });
        return result;
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @param {String} trackedPhone - contact added by user that should be tracked
     * @param {Boolean} tracked - The flag that indicates is the contact tracked
     * @returns {Promise<Object>}
     */

    async update({ userId, trackedPhone, tracked }) {
        //todo: find out why no error on bad requests
        const result = await this.db
            .queryAsync(
                'UPDATE tracked_phones SET tracked = $1, updated_at = NOW() WHERE user_id = $2 AND tracked_phone = $3',
                [tracked, userId, trackedPhone]
            )
            .catch((err) => {
                throw new RepoError(err);
            });
        return result;
    }

    /**
     * @method
     * @param {Number} userId - user identifier
     * @param {Boolean} tracked - The flag that indicates is the contact tracked
     * @returns {Promise<Object>}
     */
    async updateUserContacts({ userId, tracked }) {
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

    /**
     * @method
     * @param {String} trackedPhone - tracked phonenumber which session we should update
     * @param {String} sessionId - session identifier
     * @returns {Promise<Object>}
     */
    async updateSessionId({ trackedPhone, sessionId }) {
        const result = await this.db
            .queryAsync('UPDATE tracked_phones SET session_id = $1 WHERE tracked_phone = $2', [sessionId, trackedPhone])
            .catch((err) => {
                throw new RepoError(err);
            });
        return result;
    }
}
