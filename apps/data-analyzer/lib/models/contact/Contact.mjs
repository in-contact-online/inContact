import ModelBase from '../ModelBase.mjs';
import logger from '../../api/logger.mjs';

export class Contact extends ModelBase {
    /**
     * @typedef {Class} Contact
     * @property getTrackedByUser
     * @property sendReport
     */

    /**
     * @method
     * @param {String} userId - user identifier
     * @returns {Promise<Object>}
     */
    async getTrackedByUser({ userId }) {
        return await this.repository.contact.read({ userId });
    }

    /**
     * @method
     * @param {Object} params - user params
     * @param {Number} params.userId - user identification
     * @param {String} params.report - user report
     * @returns {Promise<Object>}
     */
    async sendReport({ userId, report }) {
        const user = await this.repository.user.read({ userId });
        if (user.email) {
            await this.notificator.email.send({
                to: user.email,
                text: report,
                subject: 'Tracked contacts information',
                html: report
            });
        } else {
            logger.warn('User has no email');
        }
    }
}
