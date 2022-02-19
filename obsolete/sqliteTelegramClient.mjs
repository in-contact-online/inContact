import { StringSession } from 'telegram/sessions/index.js';
import { AuthKey } from 'telegram/crypto/AuthKey.js';
import { TelegramClient } from 'telegram';

import fs from 'fs';

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function sqliteTelegramClient(acc_path, session_path) {
    async function getSession(path) {
        const session = new StringSession();

        const db = await open({
            filename: path,
            driver: sqlite3.Database,
        });

        const { dc_id, server_address, port, auth_key } = await db.get('SELECT * FROM sessions');

        session.setDC(dc_id, server_address, port);
        const authKey = new AuthKey();
        authKey.setKey(auth_key);
        session.setAuthKey(authKey);

        return session;
    }

    const session = await getSession(session_path);
    const data = JSON.parse(fs.readFileSync(acc_path));

    const client = new TelegramClient(session, data.app_id, data.app_hash, {});
    client.data = data;

    return client;
}
