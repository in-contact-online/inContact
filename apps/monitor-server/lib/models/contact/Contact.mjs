import ModelBase from '../ModelBase.mjs';

/**
 * @swagger
 * components:
 *  schemas:
 *      Contact:
 *          type: object
 *          properties:
 *              user_id:
 *                  type: number
 *                  description: Identify user that is tracking contact.
 *              tracked_phone:
 *                  type: string
 *                  description: Tracked phone number.
 *              tracked:
 *                  type: boolean
 *                  description: The flag that indicates does the phone is tracked.
 *              created_at:
 *                  type: string (ISO 8601)
 *                  description: The time stamp when the phone number start tracked, in ISO 8601 format.
 *              updated_at:
 *                  type: string (ISO 8601)
 *                  description: The time stamp when the tracked phone changed, in ISO 8601 format.
 *              id:
 *                  type: number
 *                  description: Record identifier.
 *              session_id:
 *                  type: string
 *                  description: Unique identifier of the session that is tracking the phone number.
 *      Contacts:
 *          type: object
 *          properties:
 *              data:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Contact'
 *              total:
 *                  type: number
 *                  description: Total number of the contacts.
 */
export class Contact extends ModelBase {
    /**
     * @typedef {Class} Contact
     * @property readList
     */

    /**
     * @method
     * @param {Object} params - filter parameters
     * @param {Number} params.page - page number
     * @param {Number} params.size - page size
     * @returns {Promise<Object>}
     */
    async readList(params) {
        return this.repository.contact.readList(params);
    }

    /**
     * @method
     * @returns {Promise<Object>}
     */
    async getTotal() {
        return this.repository.contact.total();
    }
}
