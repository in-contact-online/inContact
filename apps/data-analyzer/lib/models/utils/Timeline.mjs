import moment from 'moment';

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
     * @param {String|null} status.was_online - timestamp when user was online
     * @param {String} status.check_date - timestamp check date
     * @param {String|null} prevStatus.was_online - timestamp when user was online
     * @param {String} prevStatus.check_date - timestamp check date
     * @returns {Promise<void>}
     */
    handleStatus(status, prevStatus) {
        const wasOnline = status.was_online ? moment(status.was_online) : null;
        const curCheckDate = moment(status.check_date);
        const prevCheckDate = prevStatus ? moment(prevStatus.check_date) : curCheckDate.clone().add(-5, 'minutes');
        const startOfHour = curCheckDate.clone().startOf('hour').format('YYYY-MM-DD HH:mm');
        if (!this.#data.hasOwnProperty(startOfHour)) this.#data[startOfHour] = 0;

        if(!wasOnline) {
            this.#data[startOfHour] += curCheckDate.diff(prevCheckDate, 'seconds');
        } else if (wasOnline.isBetween(prevCheckDate, curCheckDate, '(]')) {
            this.#data[startOfHour] += wasOnline.diff(prevCheckDate, 'seconds');
        }
    }

    /**
     * @property
     * @returns {Object}
     */
    get data() {
        return this.#data;
    }
}
