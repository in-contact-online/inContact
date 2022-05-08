/* eslint-disable*/
const util = require('./util');

const isoDateRe = /^(([0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9]))(T(2[0-3]|[01][0-9]):([0-5][0-9])(:([0-5][0-9])(\.[0-9]+)?)?(Z|[\+\-](2[0-3]|[01][0-9]):([0-5][0-9])))?$/;
const dateRe = /^(\d{4})-([0-1][0-9])-([0-3][0-9])$/;

function isDateValid(value) {
    const matched = value.match(dateRe);
    if (matched) {
        const epoch = Date.parse(value);
        if (!epoch && epoch !== 0) return false;
        
        const d = new Date(epoch);
        d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);

        if (
            d.getFullYear() == matched[1]
            && d.getMonth() + 1 == +matched[2]
            && d.getDate() == +matched[3]
        ) {
            return true;
        }
    }
    
    return false;
}

function iso_date() {
    return (value) => {
        if (util.isNoValue(value)) return;
        if (!util.isPrimitiveValue(value)) return 'FORMAT_ERROR';
        
        const matched = (`${value}`).match(isoDateRe);

        if (!matched || !isDateValid(matched[1])) return 'WRONG_DATE';
    };
}

module.exports = iso_date;
