const fs = require("fs");

function getUserName(user) {
     return `${user.firstName} ${user.lastName ? user.lastName : ""}`.trim();
}

function getFileName(username) {
     return `${username}.csv`;
}

function getFilePath(filename) {
     return `./users/${filename}`;
}

function formatUserStatus(user) {
     return `${user.phone},${user},${user.username},${humanReadableDate(user.status.wasOnline)},${new Date().toISOString()}\r\n`;
}

function getFileHeader() {
     return 'phone,user,username,was_online,check_date\r\n';
}

function fileExist(path) {
     return fs.fileExist(path);
}

function humanReadableDate(unixTs) {
     return new Date(unixTs * 1000).toISOString();
}

module.exports = {
     getFileName,
     getFilePath,
     fileExist,
     getUserName,
     formatUserStatus,
     getFileHeader,
}
