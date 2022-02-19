import fs from 'fs';
import path from 'path';
import { readdir } from 'fs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { getFileName, getFilePath, getUserName, formatUserStatus } from './formatUtils.mjs';

export async function createFile(filePath, status) {
    const header = 'phone,user,username,was_online,check_date\r\n';
    const content = header + status;
    return fs.writeFile(filePath, content, (err) => {
        if (err) console.error('Create File Error:', err);
        else {
            console.log(`File ${filePath} written successfully.`);
        }
    });
}

export async function appendToFile(file, content) {
    return fs.appendFile(file, content, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`${new Date().toISOString()}: "${file}" append successfully.`);
        }
    });
}

export function fileExist(path) {
    return fs.existsSync(path);
}

export async function writeToFile(users = []) {
    for (let user of users) {
        const name = getUserName(user);
        const filePath = getFilePath(getFileName(name));
        const status = formatUserStatus(user);

        if (!fileExist(filePath)) {
            await createFile(filePath, status);
        } else {
            await appendToFile(filePath, status);
        }
    }
}

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

export async function readSqlite(filePath, tableName) {
    return open({ filename: filePath, driver: sqlite3.Database }).then(async (db) => db.get(`SELECT * FROM ${tableName}`));
}
