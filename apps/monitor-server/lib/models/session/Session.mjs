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
 *      SessionCreateBody:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
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
     * @param {Object} params
     * @param {Number} params.sessionId - session identifier
     * @returns {Promise<Object>}
     */
    async readById(params) {
        return this.repository.session.readBySessionId(params);
    }

    /**
     * @method
     * @returns {Promise<Object>}
     */
    async getTotal() {
        return this.repository.session.total();
    }

    /**
     * @method
     * @param {Object} params - session
     * @property {String} sessionId - session identifier that equal phone number that activates the session
     * @property {String} authKey - Telegram session authentication key
     * @property {String} dcId - Telegram DC ID
     * @property {String} serverAddress - Telegram session server address
     * @property {String} port - Telegram session port
     * @property {Boolean} valid - if session is valid
     * @returns {Promise<Object>}
     */
    async save(params) {
        return this.repository.session.save(params);
    }

    /**
     * @method
     * @param {Object} params - session
     * @property {String} sessionId - session identifier that equal phone number that activates the session
     * @returns {Promise<Object>}
     */
    async remove(params) {
        return this.repository.session.remove(params);
    }
}
