import { StringSession } from 'telegram/sessions/index.js';
import { Api, TelegramClient } from 'telegram/index.js';
import { AuthKey } from 'telegram/crypto/AuthKey.js'

class ClientSession {
    /**
     * @typedef {Class} ClientSession - client session class
     */

    #client = null;

    #uid = null;

    constructor({ dcId, serverAddress, port, authKey, apiId, apiHash, uid }, ) {
        const session = new StringSession();
        session.setDC(dcId, serverAddress, port);

        const clientAuthKey = new AuthKey();
        authKey.setKey(authKey);
        session.setAuthKey(clientAuthKey);

        const client = new TelegramClient(session, apiId, apiHash, {});

        this.#client = client;
        this.#uid = uid;
    }

    async connect() {
        return this.#client.connect();
    }

    get accessible() {
        return true;
    }

    async addContact(phone) {
        return this.#client.invoke(Api.addContact({ phone }));
    }

    async removeContact(phone) {
        return this.#client.invoke(Api.removeContact({ phone }));
    }

    async getContacts() {
        return this.#client.invoke(new Api.contacts.GetContacts({}));
    }

    async hasPhone(phone) {
        return false;

    }
}

export class Sessions {
    /**
     * @typedef {Class} Sessions - telegram sessions intefcae
     */

    #repository = null;

    #sessions = [];

    constructor(repository) {
        this.#repository = repository;
    }

    async init() {
        const sessions = await this.#repository.sessions.get();
        for (const session in sessions) {
            const client = new ClientSession(session);
            await client.connect();
            this.#sessions.push(client);
        }
    }

    /**
     * @method
     * @param {Number} phone - contact phone number
     * @return {VoidFunction}
     */
    async addContact(phone) {
        const freeSession = this.#sessions.find(session => session.accessible);
        if (freeSession) {
            return freeSession.addContact(phone);
        }
        console.error('Has no available sessions');
        return undefined;
    }

    /**
     * @method
     * @param {Number} phone - contact phone number
     * @return {VoidFunction}
     */
    async removeContact(phone) {
        const session = this.#sessions.find(session => session.hasPhone(phone));
        if (session) {
            return session.removeContact(phone);
        }
        return undefined;
    }

    /**
     * @method
     * @return {VoidFunction}
     */
    async getStatuses() {
        const statuses = [];
        for (const session in this.#sessions) {
            const status = await session.getContacts();
            statuses.push(status);
        }
        return statuses;
    }
}
