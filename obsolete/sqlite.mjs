import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

import { StringSession } from 'telegram/sessions/index.js';
import { Api, TelegramClient } from 'telegram/index.js';
import { AuthKey } from 'telegram/crypto/AuthKey.js';

const apiId = 2040;
const apiHash = 'b18441a1ff607e10a989891a5462e627';

open({
    filename: './accs/+79817830914.session',
    driver: sqlite3.Database,
}).then(async (db) => {
    const { dc_id, server_address, port, auth_key } = await db.get('SELECT * FROM sessions');
    console.log(server_address);

    const session = new StringSession();
    session.setDC(dc_id, server_address, port);
    session.setAuthKey(new AuthKey(auth_key));

    const client = new TelegramClient(session, apiId, apiHash, {});
    await client.connect();

    console.log('connected...');
    console.log(client.session.save());
});
