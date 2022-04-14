import express from 'express';
import { updateSessions } from '../../scripts/index.mjs';
import { Api } from 'telegram';
import { CronJob } from 'cron';
import { Sessions } from '../../models/index.mjs';
import logger from '../logger.mjs';

let service = null;

export function start(config) {
    service = express()
        .get('/', (req, res) => res.send('Hello'))
        .get('/sessions_update', async (req, res) => {
            const newSessions = await updateSessions();
            let sessionMessage = 'No message to ADD!';
            if (newSessions.length !== 0) sessionMessage = newSessions.map((session) => session.phone).join(', ');
            res.send('New sessions: ' + sessionMessage);
        })
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
        },
        null,
        true,
        null
    );
    job.start();
}
