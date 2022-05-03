import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { StringSession } from 'telegram/sessions/index.js';
import { Api, TelegramClient } from 'telegram/index.js';
import { AuthKey } from 'telegram/crypto/AuthKey.js';
import { config } from './config.mjs';

open({
    filename: './accs/+79817830914.session',
    driver: sqlite3.Database,
}).then(async (db) => {
    const { dc_id, server_address, port, auth_key } = await db.get('SELECT * FROM sessions');

    const session = new StringSession();
    session.setDC(dc_id, server_address, port);

    const authKey = new AuthKey();
    authKey.setKey(auth_key);
    session.setAuthKey(authKey);

    const client = new TelegramClient(session, config.apiId, config.apiHash, {});

    try {
        await client.connect();
    } catch (e) {
        console.log(e);
    }

    /*  console.log('connected...');
    console.log(client.session.save());

    let { users } = await client.invoke(new Api.contacts.GetContacts({}));
    console.log(users); */
});
