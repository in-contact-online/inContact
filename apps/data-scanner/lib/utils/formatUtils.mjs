/**
 * @function
 * @param {Object} user - user
 * @param {String} user.firstName - user first name
 * @param {String} user.lastName - user last name
 * @return {String}
 */
export function getUserName(user) {
    return `${user.firstName} ${user.lastName ? user.lastName : ''}`.trim();
}

/**
 * @function
 * @param {String} username - user name
 * @return {String}
 */
export function getFileName(username) {
    return `${username}.csv`;
}

/**
 * @function
 * @param {String} fileName - file name
 * @return {String}
 */
export function getFilePath(fileName) {
    return `./users/${fileName}`;
}

/**
 * @function
 * @param {Object} user - user
 * @param {String} user.phone - user phone number
 * @param {String} user.firstName - user first name
 * @param {String} user.lastName - user last name
 * @param {String} user.username - user name
 * @param {Object|null} user.status - user statue
 * @param {Number|null} user.status.wasOnline - unix timestamp that indicates when user was online last time
 * @return {String}
 */
export function formatUserStatus(user) {
    const name = getUserName(user);
    return `${user.phone},${name},${user.username},${humanReadableDate(
        user.status.wasOnline
    )},${new Date().toISOString()}\r\n`;
}

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
