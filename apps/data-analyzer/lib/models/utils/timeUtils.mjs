import moment from 'moment';

export function roundTime(isoTime, value = 5) {
    const coeff = 1000 * 60 * value;
    const milliseconds = moment(isoTime).valueOf();
    const rounded = Math.round(milliseconds / coeff) * coeff;

    return moment(rounded).format('YYYY-MM-DD HH:mm');
}
