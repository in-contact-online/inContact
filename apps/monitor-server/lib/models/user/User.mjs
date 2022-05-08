import ModelBase from '../ModelBase.mjs';


/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *                  description: User unique identifier
 *              username:
 *                  type: string
 *                  description: User name
 *              first_name:
 *                  type: string
 *                  description: User first name
 *              second_name:
 *                  type: string
 *                  description: User second name
 *              phone:
 *                  type: string
 *                  description: User phone number
 *              active:
 *                  type: boolean
 *                  description: Flag that indicates does the user active
 *              created_at:
 *                  type: string (ISO 8601)
 *                  description: The time stamp when the user was added, in ISO 8601 format.
 *              updated_at:
 *                  type: string (ISO 8601)
 *                  description: The time stamp when the user changed, in ISO 8601 format.
 *      Users:
 *          type: object
 *          properties:
 *              data:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/User'
 *              total:
 *                  type: number
 *                  description: Total number of the users.
 */
export class User extends ModelBase {
    /**
     * @typedef {Class} User
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
        return this.repository.user.readList(params);
    }

    /**
     * @method
     * @returns {Promise<Object>}
     */
     async getTotal() {
        return this.repository.user.total();
    }
}
