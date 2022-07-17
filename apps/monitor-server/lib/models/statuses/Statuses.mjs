import ModelBase from '../ModelBase.mjs';

/**
 * @swagger
 * components:
 *  schemas:
 *      Status:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *                  description: Row identifier.
 *              phone_number:
 *                  type: string
 *                  description: Tracked phone number.
 *              username:
 *                  type: string
 *                  description: User name.
 *              was_online:
 *                  type: string (ISO 8601)
 *                  description: The time stamp when user ws online, in ISO 8601 format.
 *              check_date:
 *                  type: string (ISO 8601)
 *                  description: The time stamp when the status was chacked, in ISO 8601 format.
 *      Statuses:
 *          type: object
 *          properties:
 *              data:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Status'
 *              total:
 *                  type: number
 *                  description: Total number of the statuses.
 */
export class Statuses extends ModelBase {
    /**
     * @typedef {Class} Statuses
     * @property readList
     */

    /**
     * @method
     * @param {Object} params - filter parameters
     * @param {Number} params.page - page number
     * @param {Number} params.size - page size
     * @param {String?} phoneNumber - tracked phone number
     * @param {String?} checkFrom - check time
     * @param {String?} checkTo - check time
     * @returns {Promise<Object>}
     */
    async readList(params) {
        return this.repository.status.readList(params);
    }

    /**
     * @method
     * @param {String?} phoneNumber - tracked phone number
     * @param {String?} checkFrom - check time
     * @param {String?} checkTo - check time
     * @returns {Promise<Object>}
     */
    async getTotal(params) {
        return this.repository.status.total(params);
    }
}
