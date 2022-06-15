import ModelBase from '../ModelBase.mjs';

export class Report extends ModelBase {
    /**
     * @typedef {Class} Report
     * @property readList
     */

    /**
     * @method
     * @param {Number} params.phone - contact phone number
     * @param {Number} params.type - report type
     * @returns {Promise<Object>}
     */
    async readList(params) {
        return this.repository.report.readList(params);
    }

    /**
     * @method
     * @param {Object} params.data - report data
     * @param {Object} params.type - report type
     * @param {Object} params.phone - contact phone number
     * @returns {Promise<Object>}
     */
    async save(params) {
        return this.repository.report.save(params);
    }
}
