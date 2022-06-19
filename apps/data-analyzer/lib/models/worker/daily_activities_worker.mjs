import { createRepository } from '@rtls-platform/repository';
import { createNotificator } from '@rtls-platform/notificator/index.mjs';
import moment from 'moment';
import logger from '../../api/logger.mjs';
import { Contact } from '../contact/index.mjs';
import { Status } from '../status/index.mjs';
import { Report } from '../report/index.mjs';
import { createPgDbConnection } from '../../db/index.mjs';
import * as ConfigContainer from '../../config.cjs';
import { prepareReport } from '../utils/index.mjs';
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
const notificator = createNotificator({
     smtp: {
          port: ConfigContainer.config.smtp.port,
          host: ConfigContainer.config.smtp.host,
          user: ConfigContainer.config.smtp.user,
          password: ConfigContainer.config.smtp.password,
          from: ConfigContainer.config.smtp.from,
          secure: ConfigContainer.config.smtp.secure,
     }
});
// Init Domain Model Layer
ModelBase.setRepository(repository);
ModelBase.setNotificator(notificator);

/**
 * @param {Object} options
 * @property {Number} options.id - user identification
 * @property {String} options.username - username
 * @property {String} options.first_name - user first name
 * @property {String} options.second_name - user second name
 * @property {String} options.phone - user phone number
 * @property {Boolean} options.active - flag identifies is the user active
 * @property {String} options.created_at - timestamp when user was created
 * @property {String} options.updated_at - timestamp when user was updated
 * @property {Number} options.chat_id - telegram chat identification for user
 * @property {String} options.email - user email
 * @return {Promise<void>}
 */
async function main(options) {
     const contacts = await new Contact().getTrackedByUser({ userId: options.id, tracked: true });
     const report = {};
     for (const contact of contacts) {
          const timeline = {};
          const phoneNumber = (contact.tracked_phone || '').replace('+', '');
          const checkDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString();
          const statuses = await new Status().readByPhone({ phoneNumber, checkDate });
          statuses.forEach(status => {
               let wasOnline;
               if (status.was_online) {
                    wasOnline = moment(status.was_online).startOf('hour').format('YYYY-MM-DD HH:mm');
               } else {
                    wasOnline = moment(status.check_date).startOf('hour').format('YYYY-MM-DD HH:mm');
               }
               if (!timeline[wasOnline]) {
                    timeline[wasOnline] = 1;
               } else {
                    timeline[wasOnline] += 1;
               }
          });
          report[phoneNumber] = timeline;
          await new Report().save({ data: JSON.stringify(timeline), phone: phoneNumber, type: 'DAILY_ACTIVITY' });
     }

     await new Contact().sendReport({ userId: options.id, report: await prepareReport(report) });

     return undefined;
}

/**
 * Description
 * @param {Object} report
 * @property {Number} report.id - user identification
 * @property {String} report.username - username
 * @property {String} report.first_name - user first name
 * @property {String} report.second_name - user second name
 * @property {String} report.phone - user phone number
 * @property {Boolean} report.active - flag identifies is the user active
 * @property {String} report.created_at - timestamp when user was created
 * @property {String} report.updated_at - timestamp when user was updated
 * @property {Number} report.chat_id - telegram chat identification for user
 * @property {String} report.email - user email
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
