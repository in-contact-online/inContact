import { CronJob } from 'cron';
import { InitWorkersQueue } from '../../usecases/index.mjs';


export default class Analyzer {
     /**
     * @typedef {Class} Analyzer
     * @property init
     * @property kill
     */

     #config = null;

     #cronJob = null;

     /**
     * @param {Object} config - Application configuration
     * @param {String} config.cron - cron configuration
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
                    await new InitWorkersQueue().execute();
               },
               null,
               true,
               null
          );
          this.#cronJob.start();
     }
     
     /**
     * @method
     * @return {undefined}
     */
     stop() {
          this.#cronJob.stop();
     }
}
