import express from 'express';
import appRouter from './rest-api/router.mjs';
import logger from './logger.mjs';
import Scanner from './scanner-app/Scanner.mjs';

let service = null;
let scanner = null;

export function start(config) {
    scanner = new Scanner(config);
    service = express()
        .use('/', appRouter)
        .listen(config.port, () => {
            logger.info(`Listening on ${config.port}`);
            scanner.init();
        });
}

export async function stop() {
    if (service) {
        service.close();
    }
    if (scanner) {
        scanner.stop();
    }
    logger.info('Data Scanner Service stopped');
}
