import { createRepository } from '@in-contact/repository';
import logger from '../../api/logger.mjs';
import { Contact } from '../contact/index.mjs';
import { Status } from '../status/index.mjs';
import { createPgDbConnection } from '../../db/index.mjs';
import * as ConfigContainer from '../../config.cjs';
import ModelBase from '../ModelBase.mjs';

// Init Repository Layer
const repository = createRepository({
    db: createPgDbConnection({
        port: ConfigContainer.config.db.port,
        host: ConfigContainer.config.db.host,
        user: ConfigContainer.config.db.user,
        database: ConfigContainer.config.db.database,
        password: ConfigContainer.config.db.password,
        connectionsLimit: ConfigContainer.config.db.connectionsLimit,
    }),
});
// Init Domain Model Layer
ModelBase.setRepository(repository);

async function main(options) {
    const usersMap = {};
    const contacts = await new Contact().getTrackedByUser({ userId: options.id });
    for (const contact of contacts) {
        const phoneNumber = (contact.tracked_phone || '').replace('+', '');
        const checkDate = new Date(new Date().getTime() - 10 * 60 * 1000).toISOString();
        const statuses = await new Status().readByPhone({ phoneNumber, checkDate });
        usersMap[phoneNumber] = {};
        statuses.forEach((status) => {
            if (status.was_online) {
                const wasOnline = new Date(status.was_online).toISOString();
                usersMap[phoneNumber][wasOnline] = wasOnline;
            } else {
                const checkDate = new Date(status.check_date).toISOString();
                usersMap[phoneNumber][checkDate] = checkDate;
            }
        });
    }
    console.log(JSON.stringify(usersMap));
    return undefined;
}

/**
 * Description
 * @param {Object} report
 * @property {String} report.types - description
 * @return {Promise<void>}
 */
async function handleMessage(report) {
    try {
        await main(report);
        logger.info('[In Contact Worker] Done');
        process.exit(0);
    } catch (err) {
        logger.error('[In Contact Worker] Error');
        logger.error(err);
        process.exit(1);
    }
}

process.on('message', handleMessage);

process.on('uncaughtException', (reason) => {
    logger.error('[In Contact Worker] uncaughtException');
    logger.error('[In Contact Worker] reason ', JSON.stringify(reason));
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    logger.error('[In Contact Worker] unhandledRejection');
    logger.error('[In Contact Worker] reason ', JSON.stringify(reason));
    process.exit(1);
});

process.send('ready');
