import * as commands from './commands/index.mjs';

class Command {
     /**
     * @typedef {Class} Command
     * @property invoke
     */

     /**
     * @method
     * @param {String} command - command string
     * @param {Object} congif - configuration object
     */
     invoke(command, config) {
          switch(command) {
               case('INIT'): return commands.workers.init(config);
               default: undefined;
          }
     }
}

const command = new Command();

export default command;
