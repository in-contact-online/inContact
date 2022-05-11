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

            try {
                await client.init();
                ClientsPool.pool.push(client);
            } catch (e) {
                await new Session().update({ sessionId: client.sessionId, valid: false });
            }
        }

        ClientsPool.pool.sort((a, b) => a.contactsCount - b.contactsCount);
    }

    static addClient(client) {
        ClientsPool.pool.unshift(client);
    }

    static removeClient(client) {
        ClientsPool.pool = ClientsPool.pool.filter((item) => item.sessionId !== client.sessionId);
    }

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
                return data.users[0] ? '+' + data.users[0].phone : null;
            });
    }

    /**
     * @method
     * @returns {Promise<Object>}
     */
    static async addContacts(contactsList) {
        for (const contact of contactsList) {
            const theSameContacts = await new Contact().getTrackedByPhone({ trackedPhone: contact.tracked_phone });

            if (theSameContacts.length > 0) {
                await new Contact().updateSession({
                    userId: contact.user_id,
                    trackedPhone: contact.tracked_phone,
                    sessionId: theSameContacts[0].session_id,
                });
                return;
            }

            let result = null;

            for (const client of ClientsPool.pool) {
                result = await ClientsPool.addContact(client, contact.tracked_phone);

                if (result) {
                    await new Contact().updateSession({
                        userId: contact.user_id,
                        trackedPhone: result,
                        sessionId: client.sessionId,
                    });
                    break;
                }
            }

            if (!result) {
                await new Contact().updateTrackedStatus({
                    userId: contact.user_id,
                    trackedPhone: contact.tracked_phone,
                    tracked: false,
                });
            }
        }
    }

    static async clearContacts() {
        for (const client of ClientsPool.pool) {
            const result = await client.invoke(new Api.contacts.GetContacts({}));
            const ids = result.users.map((user) => user.id.value);
            await client.invoke(
                new Api.contacts.DeleteContacts({
                    id: ids,
                })
            );
        }
    }

    static async removeContacts(contactsList) {
        for (const contact of contactsList) {
            const client = ClientsPool.pool.find((client) => client.sessionId === contact.session_id);

            if (client) {
                const result = await client.invoke(new Api.contacts.GetContacts({}));
                const user = result.users.find((user) => '+' + user.phone === contact.tracked_phone);

                await new Contact().updateSession({
                    trackedPhone: contact.tracked_phone,
                    sessionId: null,
                    userId: contact.user_id,
                });

                const theSameContacts = await new Contact().getTrackedByPhone({ trackedPhone: contact.tracked_phone });

                if (theSameContacts.length === 0) {
                    await client.invoke(
                        new Api.contacts.DeleteContacts({
                            id: [user.id.value],
                        })
                    );
                }
            }
        }
    }

    /**
     * @method
     * @param {Object} command - Telegram command to be invoked
     * @returns {Promise<void>}
     */
    static async checkStatuses() {
        const command = new Api.contacts.GetContacts({});
        for (const client of ClientsPool.pool) {
            try {
                const result = await client.invoke(command);

                for (const user of result.users) {
                    if (user.status) {
                        const wasOnline =
                            user.status.className === 'UserStatusOnline'
                                ? null
                                : humanReadableDate(user.status.wasOnline);

                        if (wasOnline !== undefined) {
                            await new Status().save({
                                phoneNumber: user.phone,
                                username: user.username,
                                wasOnline,
                                checkDate: new Date().toISOString(),
                            });
                        } else
                            await new Contact().updateTrackedStatus({ trackedPhone: '+' + user.phone, tracked: false });
                    }
                }
            } catch (e) {
                ClientsPool.removeClient(client);
                await new Contact().removeSessionId({ sessionId: client.sessionId });
                await new Session().update({ sessionId: client.sessionId, valid: false });
            }
        }
    }
}
