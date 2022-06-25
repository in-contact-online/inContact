import moment from 'moment';
import { roundTime } from './timeUtils.mjs';

export class TimeLine {
    /**
     * @typedef {Class} TimeLine
     * @method handleStatus
     */

    #data = null;

    constructor() {
        this.#data = {};
    }

    /**
     * @method
     * @param {String} status.was_online - timestamp when user was online
     * @param {String} status.check_date - timestamp check date
     * @returns {Promise<void>}
     */
    handleStatus(status) {
        let wasOnline;
        if (status.was_online) {
            wasOnline = roundTime(status.was_online);
        } else {
            wasOnline = roundTime(status.check_date);
        }
        const startOfHour = moment(wasOnline).startOf('hour').format('YYYY-MM-DD HH:mm');
        if (!this.#data.timeline[startOfHour]) {
            this.#data.timeline[startOfHour] = {
                [wasOnline]: wasOnline
            };
        } else {
            this.#data.timeline[startOfHour][wasOnline] = wasOnline;
        }
    }

    /**
     * @property
     * @returns {Object}
     */
    get data() {
        const result = this.#data && { ...this.#data };
        for (const prop in result) {
            result[prop] = Object.values(result[prop]).length;
        }
        return result;
    }
}
