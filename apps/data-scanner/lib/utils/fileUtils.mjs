import fs from 'fs';
import path from 'path';
import { readdir } from 'fs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { getFileName, getFilePath, getUserName, formatUserStatus } from './formatUtils.mjs';

/**
 * @function
 * @param {String} filePath - file path
 * @param {String} data - data to write in filw
 * @return {Promise<void>}
 */
export async function createFile(filePath, data) {
    const header = 'phone,user,username,was_online,check_date\r\n';
    const content = header + data;
    return fs.writeFile(filePath, content, (err) => {
        if (err) console.error('Create File Error:', err);
        else {
            console.log(`File ${filePath} written successfully.`);
        }
    });
}

/**
 * @function
 * @param {String} filePath - file path
 * @param {String} data - data to write in filw
 * @return {Promise<void>}
 */
export async function appendToFile(filePath, data) {
    return fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`${new Date().toISOString()}: "${filePath}" append successfully.`);
        }
    });
}

/**
 * @function
 * @param {String} filePath - file path
 * @return {Boolean}
 */
export function fileExist(filePath) {
    return fs.existsSync(filePath);
}

/**
 * @function
 * @param {Object[]} users - list of users data
 * @return {Promise<void>}
 */
export async function writeToFile(users = []) {
    for (let user of users) {
        const username = getUserName(user);
        const filePath = getFilePath(getFileName(username));
        const data = formatUserStatus(user);

        if (!fileExist(filePath)) {
            await createFile(filePath, data);
        } else {
            await appendToFile(filePath, data);
        }
    }
}

/**
 * @function
 * @param {String} dirname - dirname
 * @param {String} fileExtension - file extensions to find
 * @return {Promise<String[]>}
 */
export async function readDir(dirname, fileExtension) {
    return new Promise((resolve, reject) => {
        readdir(dirname, (err, files) => {
            if (err) reject(err);

            const result = files.reduce((memo, fileName) => {
                if (fileName.includes(fileExtension)) {
                    memo.push(path.join(dirname, fileName));
                }
                return memo;
            }, []);

            resolve(result);
        });
    });
}

/**
 * @function
 * @param {String} filePath - path to sqlite file
 * @param {String} tableName - table name
 * @return {Promise<Object[]>}
 */
export async function readSqlite(filePath, tableName) {
    return open({ filename: filePath, driver: sqlite3.Database }).then(async (db) => db.get(`SELECT * FROM ${tableName}`));
}
