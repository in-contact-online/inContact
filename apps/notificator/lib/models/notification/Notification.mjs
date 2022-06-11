import ModelBase from '../ModelBase.mjs';

export class Notification extends ModelBase {
    /**
     * @typedef {Class} Notification
     * @property readList
     */

    /**
     * @method
     * @param {Object} params - filter parameters
     * @param {Number} params.message - email text
     * @param {Number} params.email - email address
     * @returns {Promise<Object>}
     */
    async sendEmail(params) {
        console.log('Send email');
        return {};
    }

    /**
     * @method
     * @returns {Promise<Object>}
     */
    async sendTextMessage() {
        console.log('Send text message');
        return {}
    }
}
