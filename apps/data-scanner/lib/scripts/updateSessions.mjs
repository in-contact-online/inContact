import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { Session } from '../models/index.mjs';
import * as ConfigContainer from '../config.cjs';

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

export async function readSqlite(filePath, tableName) {
    return open({ filename: filePath, driver: sqlite3.Database }).then(async (db) =>
        db.get(`SELECT * FROM ${tableName}`)
    );
}

export async function updateSessions() {
    const sessionFiles = await readDir(ConfigContainer.config.service.sessionsFolder, '.session');
    const newSessions = [];
    for (const sessionFile of sessionFiles) {
        const phone = sessionFile.match(/([^/]*)\.session/)[1];

        const { dc_id: dcId, server_address: serverAddress, port, auth_key: authKey } = await readSqlite(
            sessionFile,
            'sessions'
        );

        const session = new Session();

        const sessionByPhone = await session.readByPhone({ phone });
        if (!sessionByPhone) {
            await session.save({ phone, dcId, serverAddress, port, authKey });
            newSessions.push(await session.readByPhone({ phone }));
        }
    }
    return newSessions;
}
