import { Client } from './Client.mjs';
import { Session } from './Session.mjs';
import { humanReadableDate } from '../../utils/index.mjs';
import { Status } from '../status/index.mjs';
import { Api } from 'telegram';
import { generateRandomBigInt } from 'telegram/Helpers';
import { Phones } from '../index.mjs';

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
        Sessions.pool = [];

        const sessions = await new Session().readAll();

        for (const session of sessions) {
            const client = new Client(session, config); //todo: extend Client class with the sessionId prop
            await client.init();
            Sessions.pool.push(client); // todo: replace array with object { sessionId: client }
            // [{sessionId, api }, {sessionId, api }, {sessionId, api }]
            // {
            //     1234: {sessionId:1234, api },
            //     3456: {sessionId:3456, api },
            // }
        }
    }

    // async add(session) {
    // todo: implement logic to add session to the pool
    // }

    // async del() {
    // todo: implement logic to remove session to the pool
    // todo: mark in DB as expired
    // }

    // #findSessionById(sessionId) {}

    async addOnePhone(phoneNumber) {
        const avaliablePool = this.#pool['avaliable'];
        let result = null;

        if (avaliablePool.length === 0) {
            console.log('There are no avaliable sessions!');
            return false;
        }

        await avaliablePool[0].client
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
                if (data.users[0].phone) {
                    result = '+' + data.users[0].phone;
                    await new Phones().updateSession({
                        trackedPhone: result,
                        sessionId: avaliablePool[0].sessionId,
                    });
                }
            });

        return { addedPhone: result, sessionId: avaliablePool[0].sessionId };
    }

    /**
     * @method
     * @returns {Promise<Object>}
     */
    async addPhones(phones, attempts = 2) {
        const addedPhones = [];
        let result = null;
        let errors = 0;

        for (let phone of phones) {
            do {
                result = await addOnePhone(phone);
                errors++;
            } while (!result.addedPhone || errors < attempts);

            if (result.addedPhone) addedPhones.push(result);
            else await new Session().update({ sessionId: result.sessionId, full: false, valid: true });
        }
        return addedPhones;
    }

    // todo: addPones method. find session with the flag full eqaul to false and add phone to this session
    // todo: add session full flag in case session could not add more phones

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
