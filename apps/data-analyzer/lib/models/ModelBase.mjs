export default class ModelBase {
    /**
     * @typedef {Class} ModelBase
     */

    /**
     * @property {String|null}
     */
    static object = null;

    /**
     * @type {Repository}
     */
    repository = null;

    /**
     * @type {Notificator}
     */
    notificator = null;

    constructor() {
        this.repository = ModelBase.repositoryInstance;
        this.notificator = ModelBase.notificatorInstance;
    }

    /**
     * @static
     * @return {Repository}
     */
    static repositoryInstance = null;

    /**
     * @static
     * @return {Notificator}
     */
    static notificatorInstance = null;

    /**
     * @static
     * @method
     */
    static setRepository(repository) {
        ModelBase.repositoryInstance = repository;
    }

    /**
     * @static
     * @method
     */
    static setNotificator(notificator) {
        ModelBase.notificatorInstance = notificator;
    }
}
