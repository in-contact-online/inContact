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
     * @param {Boolean} tracked - user identifier
     * @returns {Promise<Object>}
     */
    async getTrackedByUser({ userId, tracked = true }) {
        return await this.repository.contact.read({ userId, tracked });
    }

    /**
     * @method
     * @param {Object} params - user params
     * @param {Number} params.userId - user identification
     * @param {Object} params.report - user report
     * @param {String} params.report.html - email content
     * @param {Array<Object>} params.report.attachments - email attachments
     * @returns {Promise<Object>}
     */
    async sendReport({ userId, report }) {
        const user = await this.repository.user.read({ userId });
        if (user.email) {
            await this.notificator.email.send({
                to: user.email,
                text: "Hi there. We made a daily report for you ;)",
                subject: 'InContact Daily Report',
                html: report.html,
                attachments: report.attachments,
            });
        } else {
            logger.warn('User has no email');
        }
    }
}
