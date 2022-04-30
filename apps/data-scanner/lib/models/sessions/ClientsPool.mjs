import { Client } from './Client.mjs';
import { Session } from './Session.mjs';
import { humanReadableDate } from '../../utils/index.mjs';
import { Status } from '../status/index.mjs';
import { Api } from 'telegram';
import { generateRandomBigInt } from 'telegram/Helpers';
import { Contact } from '../index.mjs';

export class ClientsPool {
    /**
     * @typedef {Class} ClientsPool
     * @method init
     * @method invokeEach
     */

    /**
     * @property {Client[]}
     */
    static pool = null;

    /**
     * @param {Object} config - service configuration
     * @param {String} config.sessionsFolder - folder path with telegram sessions
     * @param {String} config.apiId - Telegram Api id
     * @param {String} config.apiHash - Telegram Api hash
     * @returns {Promise<void>}
     */
    static async init(config) {
        if (ClientsPool.pool) return;
        ClientsPool.pool = [];

        const sessions = await new Session().readAll({ valid: true });

        for (const session of sessions) {
            const client = new Client(session, config);
            await client.init();
            ClientsPool.pool.push(client);
        }
    }

    // async add(session) {
    // todo: implement logic to add session to the pool
    // }

    // async del() {
    // todo: implement logic to remove session to the pool
    // todo: mark in DB as expired
    // }

    static async addContact(client, phoneNumber) {
        return client
            .invoke(
                new Api.contacts.ImportContacts({
                    contacts: [
                        new Api.InputPhoneContact({
                            clientId: generateRandomBigInt(),
                            phone: phoneNumber,
                            firstName: 'name',
                            lastName: 'lastName',
                        }),
                    ],
                })
            )
            .then(async (data) => {
                console.log('Adding ' + JSON.stringify(data));
                return data.users[0] ? '+' + data.users[0].phone : null;
            });
    }

    /**
     * @method
     * @returns {Promise<Object>}
     */
    static async addContacts(phoneNumberList) {
        for (let phoneNumber of phoneNumberList) {
            for (const client of ClientsPool.pool) {
                if (client.isFull) continue;

                let result = null;
                let attempts = 0;

                while (!result || attempts < 3) {
                    result = await ClientsPool.addContact(client, phoneNumber);
                    attempts++;
                }

                if (result) {
                    await new Contact().update({ trackedPhone: result, sessionId: client.sessionId });
                    break;
                } else {
                    client.isFull = true;
                    await new Session().update({ sessionId: client.sessionId, isFull: true });
                }
            }
        }
    }

    // todo: deletePones method. find session and remove phone contact
    // client = this.#pool.find(_clit => client.sessionId=== sessionsId)
    // await client.invoke(remove phone command)

    /**
     * @method
     * @param {Object} command - Telegram command to be invoked
     * @returns {Promise<void>}
     */
    static async checkStatuses() {
        const command = new Api.contacts.GetContacts({});
        for (const client of ClientsPool.pool) {
            // todo: implement mechanism/functionality that define session expiration/invalid state
            // if session was expired or become invalid than clear this session id in tracked_phoned table
            // remove session from pool invoke this.del(sessionId)

            const result = await client.invoke(command);

            for (const user of result.users) {
                if (user.status) {
                    const wasOnline =
                        user.status.className === 'UserStatusOnline' ? null : humanReadableDate(user.status.wasOnline);

                    if (wasOnline !== undefined) {
                        await new Status().save({
                            phoneNumber: user.phone,
                            username: user.username,
                            wasOnline,
                            checkDate: new Date().toISOString(),
                        });
                    }
                }
            }
        }
    }
}
