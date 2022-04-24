import { CronJob } from 'cron';
import appCommand from '../command-api/command.mjs';
import { COMMANDS } from '../command-api/constants.mjs';


export default class Scanner {
     /**
     * @typedef {Class} Scanner
     * @property init
     * @property stop
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
                    await appCommand.invoke(COMMANDS.SESSIONS.INIT, this.#config);
                    await appCommand.invoke(COMMANDS.SCANNER.READ, this.#config);
                    await appCommand.invoke(COMMANDS.SESSIONS.UPDATE, this.#config);
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
