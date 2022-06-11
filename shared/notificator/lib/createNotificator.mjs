import { Notificator } from './api/Notificator.mjs';


const cache = {
    instance: null,
};

/**
 * @function
 * @param {Object} options - smtp options
 * @param {String} options.shared - flag that indicates is the notificator shared
 * @param {String} options.smtp.host - email sending host
 * @param {Number} options.smtp.port - email sending port
 * @param {String} options.smtp.user - email service user
 * @param {String} options.smtp.password - email service password
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

    notificator = new Notificator(options.smtp);

    if (shared) {
        cache.instance = notificator;
    }

    return notificator;
}
