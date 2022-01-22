import winston from 'winston';
import { CoreLogger } from '../core';

function formatObject(param) {
    if (typeof param === 'string') return param;

    if (param instanceof Error) return param.stack ? param.stack : JSON.stringify(param, null, 2);

    return JSON.stringify(param, null, 2);
}

export class WinstonLogger extends CoreLogger {
    #logger = null;

    #transports = null;

    constructor({ logLevel = 'info', serviceName = 'rtls-platform' }) {
        super();

        const options = {
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
                winston.format.printf((info) => `[${info.timestamp}] [${info.service}] [${info.level}] ${info.message}`)
            ),
            defaultMeta: { service: serviceName },
            transports: [new winston.transports.Console({ level: logLevel })],
        };

        this.#transports = {
            console: new winston.transports.Console(),
        };
        this.#logger = winston.createLogger({ ...options, transports: [this.#transports.console] });
    }

    level({ level = 'debug' }) {
        this.#transports.console.level = level;
    }

    info(...args) {
        this.#logger.info(args.map(formatObject).join(' '));
    }

    debug(...args) {
        this.#logger.debug(args.map(formatObject).join(' '));
    }

    warn(...args) {
        this.#logger.warn(args.map(formatObject).join(' '));
    }

    error(...args) {
        this.#logger.error(args.map(formatObject).join(' '));
    }
}
