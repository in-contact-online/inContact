import ModelBase from '../ModelBase.mjs';

/**
 * @swagger
 * components:
 *  schemas:
 *      Session:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: Session unique identifier.
 *              auth_key:
 *                  type: object
 *                  description: Session authentication key.
 *                  properties:
 *                      type:
 *                          type: string
 *                          description: Data type
 *                      data:
 *                          type: array
 *              dc_id:
 *                  type: number
 *                  description: Data center identifier.
 *              server_address:
 *                  type: string
 *                  description: IP address of the server.
 *              port:
 *                  type: number
 *                  description: Port number.
 *              active:
 *                  type: boolean
 *                  description: The flag that identify does the session is active.
 *              valid:
 *                  type: boolean
 *                  description: The flag that identify does the session is valid.
 *      Sessions:
 *          type: object
 *          properties:
 *              data:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Session'
 *              total:
 *                  type: number
 *                  description: Total number of the sessions.
 */
export class Session extends ModelBase {
    /**
     * @typedef {Class} Session
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
        return this.repository.session.readList(params);
    }

    /**
     * @method
     * @returns {Promise<Object>}
    */
    async getTotal() {
        return this.repository.session.total();
    }
}
