import child_process from 'child_process';
import path from 'path';
import logger from '../../api/logger.mjs';

const __dirname = new URL('.', import.meta.url).pathname;

export class Worker {
    #worker = null;

    constructor(params) {
        this.params = params;
    }

    handleExit(rej) {
        logger.info('handleExit');
        rej();
    }

    handleError(res) {
        logger.info('handleError');
        res();
    }

    async run() {
        return new Promise((res, rej) => {
            this.#worker = child_process.fork(path.join(__dirname, `./analyze_worker.mjs`));
            this.#worker.on('error', this.handleError.bind(this, rej));
            this.#worker.on('exit', this.handleExit.bind(this, res));
            this.#worker.send(this.params);
        })
    }
}
