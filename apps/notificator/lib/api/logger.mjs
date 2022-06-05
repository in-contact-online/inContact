let _LOGGER = console;

export function setLogger(logger) {
    _LOGGER = logger;
}

export default {
    error(...args) {
        _LOGGER.error(...args);
    },
    warn(...args) {
        _LOGGER.warn(...args);
    },
    info(...args) {
        _LOGGER.info(...args);
    },
    debug(...args) {
        _LOGGER.debug(...args);
    },
    level(params) {
        _LOGGER.level(params);
    },
};
