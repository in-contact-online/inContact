import { Client } from './Client.mjs';
import { Session } from './Session.mjs';
import { humanReadableDate } from '../../utils/index.mjs';
import { Status } from '../status/index.mjs';
import { Api } from 'telegram';
import { generateRandomBigInt } from 'telegram/Helpers';
import { Contact } from '../index.mjs';

export class Sessions {
    /**
     * @typedef {Class} Sessions
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
        if (Sessions.pool) return;
        Sessions.pool = {
            available: new Map(),
            filled: new Map(),
        };

        const sessions = await new Session().readAll();

        for (const session of sessions) {
            const client = new Client(session, config);
            await client.init();

            if (session.isFull) Sessions.pool.filled.set(session.id, { sessionId: session.id, client });
            else Sessions.available.set(session.id, { sessionId: session.id, client });
        }
    }

    // async add(session) {
    // todo: implement logic to add session to the pool
    // }

    // async del() {
    // todo: implement logic to remove session to the pool
    // todo: mark in DB as expired
    // }

    static async findSessionById(sessionId) {
        if (Sessions.pool.filled[sessionId]) return Sessions.pool.filled[sessionId];
        else if (Sessions.pool.available[sessionId]) return Sessions.pool.available[sessionId];
        else return null;
    }

    static async addContact(client, phoneNumber) {
        await client
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
                return data.users[0].phone ? '+' + data.users[0].phone : null;
            });
    }

    static async addSessionToFilled(session) {
        Sessions.pool.available.delete(session.sessionId);
        Sessions.pool.filled.set(session.sessionId, session);
        await new Session().update({ sessionId: session.sessionId, isFull: true });
    }

    /**
     * @method
     * @returns {Promise<Object>}
     */
    async addContacts(phones) {
        for (let phoneNumber of phones) {
            const iterator = pool.available.entries();
            let session = iterator.next().value;

            let result = null;

            while (session && !result) {
                let attempts = 0;
                while (!result && attempts < 3) {
                    result = await Session.addContact(session.client, phoneNumber);
                    if (result)
                        await new Contact().update({
                            trackedPhone: result,
                            sessionId: session.sessionId,
                        });

                    attempts += 1;
                }
                if (!result) await addSessionToFilled(session);
                session = session.next().value;
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
    static async invokeEach(command) {
        for (const client of Sessions.pool) {
            // todo: implement mechanism/functionality that define session expiration/invalid state
            // if session was expired or become invalid than clear this session id in tracked_phoned table
            // remove session from pool invoke this.del(sessionId)
            const result = await client.invoke(command);

            for (let user of result.users) {
                if (user.status) {
                    const wasOnline =
                        user.status.className === 'UserStatusOnline' ? null : humanReadableDate(user.status.wasOnline);

                    if (wasOnline !== undefined) {
                        const params = {
                            phoneNumber: user.phone,
                            username: user.username,
                            wasOnline,
                            checkDate: new Date().toISOString(),
                        };

                        await new Status().save(params);
                    }
                }
            }
        }
    }
}
