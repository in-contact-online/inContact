import {Client} from './Client.mjs';
import {Session} from './Session.mjs';
import {humanReadableDate} from '../../utils/index.mjs';
import {Status} from '../status/index.mjs';
import {Api} from 'telegram';
import {generateRandomBigInt} from 'telegram/Helpers';
import {Contact} from '../index.mjs';
import logger from '../../api/logger.mjs';

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
     * @returns {Promise<void>}
     */
    static async sync() {
        ClientsPool.pool = [];

        const sessions = await new Session().readAll({valid: true});

        for (const session of sessions) {
            const client = new Client(session);

            try {
                await client.init();
                ClientsPool.pool.push(client);
            } catch (e) {
                logger.error(e);
                await new Session().invalidate(client.sessionId);
            }
        }

        ClientsPool.pool.sort((a, b) => a.contactsCount - b.contactsCount);
    }

    static async init() {
        if (ClientsPool.pool) return;
        await ClientsPool.sync();
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
                if (data.users[0])
                    logger.info(`Contact ${data.users[0].phone} added to the Pool to the session ${client.sessionId}`);
                return data.users[0] ? '+' + data.users[0].phone : null;
            });
    }

    /**
     * @method
     * @returns {Promise<Object>}
     */
    static async addContacts(contactsList) {
        for (const contact of contactsList) {
            const theSameContacts = await new Contact().getTrackedByPhone({trackedPhone: contact.tracked_phone});

            if (theSameContacts.length > 0) {
                await new Contact().updateSession({
                    userId: contact.user_id,
                    trackedPhone: contact.tracked_phone,
                    sessionId: theSameContacts[0].session_id,
                });
                continue;
            }

            let phone = null;

            for (const client of ClientsPool.pool) {
                phone = await ClientsPool.addContact(client, contact.tracked_phone);

                if (phone) {
                    await new Contact().updateSession({
                        userId: contact.user_id,
                        trackedPhone: phone,
                        sessionId: client.sessionId,
                    });
                    break;
                }
            }

            if (!phone) {
                await new Contact().updateTrackedStatus({
                    userId: contact.user_id,
                    trackedPhone: contact.tracked_phone,
                    tracked: false,
                });
            }
        }
    }

    static async removeContacts(contactsList) {
        for (const contact of contactsList) {
            await new Contact().updateSession({
                userId: contact.user_id,
                trackedPhone: contact.tracked_phone,
                sessionId: null,
            });

            const client = ClientsPool.pool.find((client) => client.sessionId === contact.session_id);

            if (client) {
                const theSameContacts = await new Contact().getTrackedByPhone({trackedPhone: contact.tracked_phone});

                if (theSameContacts.length === 0) {
                    const result = await client.invoke(new Api.contacts.GetContacts({}));
                    const user = result.users.find((user) => '+' + user.phone === contact.tracked_phone);

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
     * @returns {Promise<void>}
     */
    static async checkStatuses() {
        const getContactsCommand = new Api.contacts.GetContacts({});
        for (const client of ClientsPool.pool) {
            try {
                const result = await client.invoke(getContactsCommand);
                for (const user of result.users) {
                    if (user.status) {
                        const wasOnline =
                            user.status.className === 'UserStatusOnline'
                                ? null
                                : humanReadableDate(user.status.wasOnline);
                        if (wasOnline === null) {
                            await new Contact().notifyTrackedOnline({trackedPhone: '+' + user.phone});
                        }
                        if (wasOnline !== undefined) {
                            await new Status().save({
                                phoneNumber: user.phone,
                                username: user.username,
                                wasOnline,
                                checkDate: new Date().toISOString(),
                            });
                        } else
                            await new Contact().updateTrackedStatus({trackedPhone: '+' + user.phone, tracked: false});
                    }
                }
            } catch (e) {
                logger.error(e);
                ClientsPool.removeClient(client);
                await new Contact().removeSessionId({sessionId: client.sessionId});
                logger.info(`Session ${client.sessionId} failed`);
                await new Session().invalidate(client.sessionId);
            }
        }
    }
}
