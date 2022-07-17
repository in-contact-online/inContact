import moment from 'moment';
import 'moment-timezone';

export class TimeLine {
    /**
     * @typedef {Class} TimeLine
     * @method handleStatus
     */

    #data = null;

    #timezone = 'Etc/Gmt';

    /**
     * @param {String} timezone - timezone
     */
    constructor(timezone) {
        this.#timezone = timezone;
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
        const wasOnline = status.was_online ? moment(status.was_online).tz(this.#timezone) : null;
        const curCheckDate = moment(status.check_date).tz(this.#timezone);
        const prevCheckDate = prevStatus
            ? moment(prevStatus.check_date).tz(this.#timezone)
            : curCheckDate.clone().add(-5, 'minutes');
        const startOfHour = curCheckDate.tz(this.#timezone).clone().startOf('hour').format('YYYY-MM-DD HH:mm');
        // eslint-disable-next-line no-prototype-builtins
        if (!this.#data.hasOwnProperty(startOfHour)) this.#data[startOfHour] = 0;

        if (!wasOnline) {
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
