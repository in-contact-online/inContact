import express from 'express';
import appRouter from './rest-api/router.mjs';
import * as swagger from './swagger';
import logger from './logger.mjs';
import middlewares from './middlewares.mjs';

let http = null;

export function start(config) {
    http = express()
        .use(middlewares.cors)
        .use(middlewares.json)
        .use(middlewares.urlencoded)
        .use('/app', middlewares.static)
        .use('/', appRouter)
        .use('/api-docs', swagger.serve, swagger.setup)
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
