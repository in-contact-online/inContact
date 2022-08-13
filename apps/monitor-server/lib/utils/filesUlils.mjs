import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { readdir, writeFileSync } from 'fs';
import path from 'path';
import tmp from "tmp";

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

export async function readSqlite(filePath) {
    return open({ filename: filePath, driver: sqlite3.Database }).then(async (db) =>
        db.get('SELECT * FROM sessions')
    );
}

/**
 * @function
 * @param {Buffer} file - file content
 * @return {Promise<String>}
 */
export async function createTempFile(file) {
    const tmpFile = tmp.fileSync({ postfix: '.session' });
    writeFileSync(tmpFile.name, file)

    return tmpFile.name;
}
