import ModelBase from '../ModelBase.mjs';

export class System extends ModelBase {
    /**
     * @typedef {Class} System
     * @property readStatuses
     * @property readResourceUsage
     */

    /**
     * @method
     * @returns {Promise<Object>}
     */
    async readStatuses() {
        return {};
    }

    /**
     * @method
     * @returns {Promise<Object>}
     */
     async readResourceUsage() {
        return {};
    }    
}
