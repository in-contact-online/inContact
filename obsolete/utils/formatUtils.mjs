export function getUserName(user) {
    return `${user.firstName} ${user.lastName ? user.lastName : ''}`.trim();
}

export function getFileName(username) {
    return `${username}.csv`;
}

export function getFilePath(filename) {
    return `./users/${filename}`;
}

export function formatUserStatus(user) {
    const name = getUserName(user);
    return `${user.phone},${name},${user.username},${humanReadableDate(
        user.status.wasOnline
    )},${new Date().toISOString()}\r\n`;
}

export function humanReadableDate(unixTs) {
    if (unixTs && typeof unixTs === 'number') {
        return new Date(unixTs * 1000).toISOString();
    }
    return unixTs;
}
