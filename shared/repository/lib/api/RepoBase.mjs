export default class RepoBase {
    /**
     * @typedef {Object} RepoBase
     */
    document = null;

    /**
     * @param {Object} db - database connection Pool
     */
    constructor(db) {
        this.db = db;
    }
}
