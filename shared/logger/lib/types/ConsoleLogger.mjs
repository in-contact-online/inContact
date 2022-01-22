import { CoreLogger } from '../core';

/**
 * Mostly for debugging proposes
 */

export class ConsoleLogger extends CoreLogger {
    #console = null;

    constructor(log) {
        super();

        this.#console = log || console;
    }

    info(...args) {
        return this.#console.info(...args);
    }

    debug(...args) {
        return this.#console.debug(...args);
    }

    warn(...args) {
        return this.#console.warn(...args);
    }

    error(...args) {
        return this.#console.error(...args);
    }
}
