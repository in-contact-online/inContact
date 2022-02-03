import express from 'express';
import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { CronJob } from "cron";
import logger from '../logger.mjs';


let service = null;

async function statuses(config) {
    logger.info('statuses');
    const client = new TelegramClient(new StringSession(config.sessionId), config.apiId, config.apiHash, {});
    await client.connect();

    const { users } = await client.invoke(new Api.contacts.GetContacts({}));
    logger.info('Scanned data');
    logger.info(users);
}

export function start(config) {
    service = express()
    .get('/', (req, res) => res.send('Hello'))
    .listen(config.port, () => {
       logger.info(`Listening on ${ config.port }`);
       new CronJob(config.cron, async function () { await statuses(config); }, null, true, null);
    });
}

export async function stop() {
    if (!service) return;

    service.close();
    logger.info('Data Scanner Service stopped');
}
