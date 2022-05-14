import express from 'express';
import logger from './logger.mjs';
import Analyzer from './analyzer-app/Analyzer.mjs';

let http = null;
let analyzer = null;

export function start(config) {
    analyzer = new Analyzer(config);
    http = express()
        .use('/', (req, res) => { res.send('Hello'); })
        .listen(config.port, async () => {
            logger.info(`Listening on ${config.port}`);
            await analyzer.init();
        });
}

export async function stop() {
    if (analyzer) {
        analyzer.stop();
    }

    if (http) {
        http.close();
    }
    logger.info('Data Analyzer Service stopped');
}
