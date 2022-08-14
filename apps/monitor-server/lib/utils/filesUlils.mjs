import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { readdir, writeFileSync, unlinkSync } from 'fs';
import path from 'path';
import tmp from 'tmp';

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
 * @param {string} filePath - path to file with sqlite content
 * @return {Promise<Object<dcId: string, serverAddress: string, port: number, authKey: Buffer>>}
 */
export async function readSqlite(filePath) {
    const db = await open({ filename: filePath, driver: sqlite3.Database });
    const result = await db.get('SELECT * FROM sessions');
    unlinkSync(filePath);

    return {
        dcId: result.dc_id,
        serverAddress: result.server_address,
        port: result.port,
        authKey: result.auth_key,
    };
}

/**
 * @function
 * @param {Buffer} file - file content
 * @return {Promise<String>}
 */
export async function createTempFile(file) {
    const tmpFile = tmp.fileSync({ postfix: '.session' });
    writeFileSync(tmpFile.name, file);

    return tmpFile.name;
}
