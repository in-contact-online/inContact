import express from 'express';
import { router } from './router.mjs';
import { Api } from 'telegram';
import { CronJob } from 'cron';
import { Sessions } from '../../models/index.mjs';
import logger from '../logger.mjs';

let service = null;

export function start(config) {
    service = express()
        .use('/', router)
        .listen(config.port, () => {
            logger.info(`Listening on ${config.port}`);
            scanStatuses(config);
        });
}

export async function stop() {
    if (!service) return;

    service.close();
    logger.info('Data Scanner Service stopped');
}

async function scanStatuses(config) {
    const sessions = new Sessions(config);
    await sessions.init();
    const job = new CronJob(
        config.cron,
        async function () {
            await sessions.invokeEach(new Api.contacts.GetContacts({}));
            // todo: check for new sessions addSessionsList
            // todo: sessions.add(addSessionsList)
            // todo: add functionality that is checking phone numbers that should be added or removed
            // todo: read DB and return two lists (addList, removeList)
            // sessions.addPhones(addList); [{trackedPhone: 1231313}, ...]
            // sessions.deletePhones(removeList); [{trackedPhone: 1231313, sessionId: 1231313}, ...]
        },
        null,
        true,
        null
    );
    job.start();
}
