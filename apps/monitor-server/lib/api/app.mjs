import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import appRouter from './rest-api/router.mjs';
import logger from './logger.mjs';
import middlewares from './middlewares.mjs';

let http = null;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function start(config) {
    http = express()
        .use(middlewares.cors)
        .use(middlewares.json)
        .use(middlewares.urlencoded)
        .use('/app', express.static(path.join(__dirname, '../../..', '/monitor-client/build')))
        .use('/', appRouter)
        .listen(config.port, () => {
            logger.info(`Listening on ${config.port}`);
        });
}

export async function stop() {
    if (http) {
        http.close();
    }
    logger.info('Service stopped');
}
