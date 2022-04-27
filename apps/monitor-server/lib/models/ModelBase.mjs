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

    constructor() {
        this.repository = ModelBase.repositoryInstance;
    }

    /**
     * @static
     * @return {Repository}
     */
    static repositoryInstance = null;

    /**
     * @static
     * @method
     */
    static setRepository(repository) {
        ModelBase.repositoryInstance = repository;
    }
}
