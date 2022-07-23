import child_process from 'child_process';
import path from 'path';
import logger from '../../api/logger.mjs';

const __dirname = new URL('.', import.meta.url).pathname;

export const WORKER_TYPES = {
    DAILY_ACTIVITIES: 'DAILY_ACTIVITIES',
    IN_CONTACT_ACTIVITIES: 'IN_CONTACT_ACTIVITIES',
};

export class Worker {
    #worker = null;

    #user = null;

    #command = null;

    constructor(user, command = '') {
        this.#user = user;
        this.#command = command;
    }

    #getWorkerPath() {
        if (this.#command === WORKER_TYPES.DAILY_ACTIVITIES) {
            return path.join(__dirname, `./daily_activities_worker.mjs`);
        } else if (this.#command === WORKER_TYPES.IN_CONTACT_ACTIVITIES) {
            return path.join(__dirname, `./in_contact_worker.mjs`);
        }
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
            this.#worker = child_process.fork(this.#getWorkerPath());
            this.#worker.on('error', this.handleError.bind(this, rej));
            this.#worker.on('exit', this.handleExit.bind(this, res));
            this.#worker.on('message', () => {
                this.#worker.send(this.#user);
            });
        });
    }
}
