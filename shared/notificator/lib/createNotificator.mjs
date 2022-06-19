import { Notificator } from './api/Notificator.mjs';


const cache = {
    instance: null,
};

/**
 * @function
 * @param {Object} options - smtp options
 * @param {Boolean} options.shared - flag that indicates is the notificator shared
 * @param {Object} options.smtp - SMTP server connection options
 * @param {Object} options.telegram - telegram bot options
 * @return {Object} - Notificator API
 */
export function createNotificator(options) {
    let notificator;
    let shared;

    shared = options.shared || true;

    if (shared) {
        notificator = cache.instance;
        if (notificator) {
            return notificator;
        }
    }

    notificator = new Notificator(options);

    if (shared) {
        cache.instance = notificator;
    }

    return notificator;
}
