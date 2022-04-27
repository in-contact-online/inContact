import express from 'express';
import appRouter from './rest-api/router.mjs';
import logger from './logger.mjs';

let http = null;

export function start(config) {
    http = express()
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
