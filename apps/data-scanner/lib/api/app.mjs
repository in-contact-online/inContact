import express from 'express';
import appRouter from './rest-api/router.mjs';
import logger from './logger.mjs';
import Scanner from './scanner-app/Scanner.mjs';

let http = null;
let scanner = null;

export function start(config) {
    scanner = new Scanner(config);
    http = express()
        .use('/', appRouter)
        .listen(config.port, () => {
            logger.info(`Listening on ${config.port}`);
            scanner.init();
        });
}

export async function stop() {
    if (scanner) {
        scanner.stop();
    }

    if (http) {
        http.close();
    }
    logger.info('Data Scanner Service stopped');
}
