import * as commands from './commands/index.mjs';
import {COMMANDS} from './constants.mjs';

class Command {
    /**
     * @typedef {Class} Command
     * @property invoke
     */

    /**
     * @method
     * @param {String} command - command string
     */
    invoke(command) {
        switch (command) {
            case COMMANDS.SESSIONS.INIT:
                return commands.sessions.init();
            case COMMANDS.SESSIONS.UPDATE:
                return commands.sessions.update();
            case COMMANDS.SCANNER.READ:
                return commands.scanner.read();
            default:
                undefined;
        }
    }
}

const command = new Command();

export default command;
