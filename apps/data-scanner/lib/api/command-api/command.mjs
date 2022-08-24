import * as commands from './commands/index.mjs';
import { COMMANDS } from './constants.mjs';

class Command {
    /**
     * @typedef {Class} Command
     * @property invoke
     */

    /**
     * @method
     * @param {String} command - command string
     * @param {Object} config - configuration object
     */
    invoke(command, config) {
        switch (command) {
            case COMMANDS.SESSIONS.INIT:
                return commands.sessions.init(config);
            case COMMANDS.SESSIONS.UPDATE:
                return commands.sessions.update(config);
            case COMMANDS.SCANNER.READ:
                return commands.scanner.read(config);
            default:
                undefined;
        }
    }
}

const command = new Command();

export default command;
