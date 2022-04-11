import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { Session } from '../models/index.mjs';
import { readDir } from './fileUtils.mjs';
import * as ConfigContainer from '../config.cjs';

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

        await session.save({ phone, dcId, serverAddress, port, authKey });
        newSessions.push(await session.readByPhone({ phone }));
    }
    return newSessions;
}
