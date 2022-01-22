import { WinstonLogger, ConsoleLogger } from './types';

export const LoggerTypes = {
    Winston: 'WINSTON',
    Console: 'CONSOLE',
};

const cache = {};

export function createLogger(
    options = {
        type: LoggerTypes.Winston,
        shared: true,
    }
) {
    let { type, shared, context } = options;
    let logger;

    type = type || LoggerTypes.Winston;
    shared = shared || true;

    if (shared) {
        logger = cache[type];
        if (logger) {
            return logger;
        }
    }

    if (type === LoggerTypes.Winston) {
        logger = new WinstonLogger(context);
    } else if (type === LoggerTypes.Console) {
        logger = new ConsoleLogger();
    }

    if (shared) {
        cache[type] = logger;
    }

    return logger;
}
