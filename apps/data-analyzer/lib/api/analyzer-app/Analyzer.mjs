import { CronJob } from 'cron';
import { InitWorkersQueue } from '../../usecases/index.mjs';
import { WORKER_TYPES } from '../../models';

export default class Analyzer {
    /**
     * @typedef {Class} Analyzer
     * @property init
     * @property kill
     */

    #config = null;

    #cronJob = null;

    #dailyCronJob = null;

    /**
     * @param {Object} config - Application configuration
     * @param {String} config.cron - cron configuration
     * @param {String} config.dailyCron - daily cron configuration
     * @param {String} config.timezone - timezone
     */
    constructor(config) {
        this.#config = config;
    }

    /**
     * @method
     * @return {undefined}
     */
    async init() {
        this.#cronJob = new CronJob(
            this.#config.cron,
            async () => {
                await new InitWorkersQueue().execute(WORKER_TYPES.IN_CONTACT_ACTIVITIES);
            },
            null,
            true,
            this.#config.timezone
        );
        this.#dailyCronJob = new CronJob(
            this.#config.dailyCron,
            async () => {
                await new InitWorkersQueue().execute(WORKER_TYPES.DAILY_ACTIVITIES);
            },
            null,
            true,
            this.#config.timezone
        );
        this.#cronJob.start();
        this.#dailyCronJob.start();
    }

    /**
     * @method
     * @return {undefined}
     */
    stop() {
        this.#cronJob.stop();
        this.#dailyCronJob.stop();
    }
}
