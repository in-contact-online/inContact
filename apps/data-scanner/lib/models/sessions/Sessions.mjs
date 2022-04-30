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
        Sessions.pool = [];

        const sessions = await new Session().readAll();

        for (const session of sessions) {
            const client = new Client(session, config);
            await client.init();

            Sessions.pool.push({
                id: session.id,
                client,
                isFull: session.is_full,
                valid: session_valid,
            });
        }
    }

    /* 

    pool = [
        {
            id: session.id,
            client,
            isFull: session.is_full,
            valid: session_valid
        }
    ]


  pool = 
  {
      filled: 
             {
                 "123":client1, 
                 "345":client2, 
                  ...
             },
  
       avaliable: 
             {
                   "666":client3, 
                   "777":client4, 
                    ...
             }
   } */

    // async add(session) {
    // todo: implement logic to add session to the pool
    // }

    // async del() {
    // todo: implement logic to remove session to the pool
    // todo: mark in DB as expired
    // }

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

    /**
     * @method
     * @returns {Promise<Object>}
     */
    async addContacts(phones) {
        for (let phoneNumber of phones) {
            for (const index in Sessions.pool) {
                if (Sessions.pool.isFull || !Sessions.pool.valid) break;

                let result = null;
                let attempts = 0;

                while (!result || attempts < 3) {
                    result = await Sessions.addContact(Sessions.pool[index].client, phoneNumber);
                    attempts++;
                }

                if (result) {
                    await new Contact().update({
                        trackedPhone: result,
                        sessionId: Sessions.pool[index].id,
                    });
                    break;
                } else {
                    Sessions.pool[index].isFull = true;
                    await new Session().update({ sessionId: Sessions.pool[index].id, isFull: true });
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
    static async invokeEach(command) {
        for (const poolItem of Sessions.pool) {
            // todo: implement mechanism/functionality that define session expiration/invalid state
            // if session was expired or become invalid than clear this session id in tracked_phoned table
            // remove session from pool invoke this.del(sessionId)

            if (!poolItem.valid) break;
            const result = await poolItem.client.invoke(command);

            for (let user of result.users) {
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
