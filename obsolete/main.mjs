import { readdir } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { StringSession } from 'telegram/sessions/index.js';
import { Api, TelegramClient } from 'telegram/index.js';
import { AuthKey } from 'telegram/crypto/AuthKey.js';
import { config } from './config.js';
import { CronJob } from 'cron';

export class TelegramClientAdapter extends TelegramClient {
    constructor({ dc_id, server_address, port, auth_key }, apiConfig) {
        const session = new StringSession();
        const authKey = new AuthKey();

        authKey.setKey(auth_key);
        session.setDC(dc_id, server_address, port);
        session.setAuthKey(authKey);

        super(session, apiConfig.apiId, apiConfig.apiHash, {});
    }
}

export class ClientSession {
    #session = null;
    #dcId = null;
    #serverAddress = null;
    #port = null;
    #authKey = null;
    #apiConfig = null;
    #uid = null;

    constructor({ dc_id, server_address, port, auth_key }, apiConfig) {
        this.#dcId = dc_id;
        this.#serverAddress = server_address;
        this.#port = port;
        this.#authKey = auth_key;
        this.#apiConfig = apiConfig;
        this.#uid = uuidv4();
    }

    async init() {
        const session = new StringSession();
        const authKey = new AuthKey();

        authKey.setKey(this.#authKey);
        session.setDC(this.#dcId, this.#serverAddress, this.#port);
        session.setAuthKey(authKey);

        this.#session = new TelegramClient(session, this.#apiConfig.apiId, this.#apiConfig.apiHash, {});
        await this.#session.connect();
    }

    get session() {
        return this.#session;
    }

    get uid() {
        return this.#uid;
    }
}

class SessionsPool {
    #config = null;
    #pool = [];

    constructor(config) {
        this.#config = config;
    }

    async init() {
        const sessionFiles = await this.readDir(this.#config.sessionsFolder);
        for (const sessionFile of sessionFiles) {
            const session = await this.readSessionFile(sessionFile);
            const client = new ClientSession(session, config);
            await client.init();
            this.#pool.push(client);
        }
    }

    async readDir(dirname) {
        return new Promise((resolve, reject) => {
            readdir(dirname, (err, files) => {
                if (err) reject(err);

                const result = files.reduce((memo, fileName) => {
                    if (fileName.includes('.session')) {
                        memo.push(path.join(dirname, fileName));
                    }
                    return memo;
                }, []);

                resolve(result);
            });
        });
    }

    async readSessionFile(filename) {
        return open({ filename, driver: sqlite3.Database }).then(async (db) => db.get('SELECT * FROM sessions'));
    }

    get pool() {
        return this.#pool;
    }

    async invokeEach(command) {
        console.log('invokeEach');
        for (const client of this.#pool) {
            const result = await client.session.invoke(command);
            console.log('result: ', result);
        }
    }
}

async function start() {
    const sessionsPoll = new SessionsPool(config);
    await sessionsPoll.init();

    const job = new CronJob(
        config.cronString,
        async function () {
            await sessionsPoll.invokeEach(new Api.contacts.GetContacts({}));
        },
        null,
        true,
        null
    );
    job.start();
}

start();
