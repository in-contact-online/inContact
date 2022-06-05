import { createRepository } from '@rtls-platform/repository';
import moment from 'moment';
import logger from '../../api/logger.mjs';
import { Contact } from '../contact/index.mjs';
import { Status } from '../status/index.mjs';
import { Report } from '../report/index.mjs';
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
     const contacts = await new Contact().getTrackedByUser({ userId: options.id });
     for (const contact of contacts) {
          const timeline = {};
          const phoneNumber = (contact.tracked_phone || '').replace('+', '');
          const checkDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString();
          const statuses = await new Status().readByPhone({ phoneNumber, checkDate });
          statuses.forEach(status => {
               if (status.was_online) {
                    const wasOnline = moment(status.was_online).startOf('minute');
                    timeline[wasOnline] = true;
               } else {
                    const checkDate = moment(status.check_date).startOf('minute');
                    timeline[checkDate] = true;
               }
          });
          await new Report().save({ data: JSON.stringify(timeline), phone: phoneNumber, type: 'DAILY_ACTIVITY' });
     }

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
          logger.info('[Daily Activities Worker] Done');
          process.exit(0);
     } catch (err) {
          logger.error('[Daily Activities Worker] Error');
          logger.error(err);
          process.exit(1);
     }
}

process.on('message', handleMessage);

process.on('uncaughtException', (reason) => {
     logger.error('[Daily Activities Worker] uncaughtException');
     logger.error('[Daily Activities Worker] reason ', JSON.stringify(reason));
     process.exit(1);
});

process.on('unhandledRejection', (reason) => {
     logger.error('[Daily Activities Worker] unhandledRejection');
     logger.error('[Daily Activities Worker] reason ', JSON.stringify(reason));
     process.exit(1);
});

process.send('ready');
