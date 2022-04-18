/**
 * @function
 * @param {Number} unixTs - unix timestamp
 * @return {Object}
 */
export function humanReadableDate(unixTs) {
    if (unixTs && typeof unixTs === 'number') {
        return new Date(unixTs * 1000).toISOString();
    }
    return unixTs;
}
