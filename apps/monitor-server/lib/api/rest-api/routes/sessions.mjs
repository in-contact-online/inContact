import { makeRequestHandler } from '../../utils/index.mjs';
import { ReadSessions, SaveSession, RemoveSession } from '../../../usecases/index.mjs';

export const sessions = {
    /**
     * @swagger
     * /sessions:
     *   get:
     *     description: Retrieve sessions list
     *     tags:
     *       - Sessions API
     *     parameters:
     *      - in: query
     *        name: page
     *        schema:
     *          type: number
     *          required: true
     *          example: 0
     *        description: page number
     *      - in: query
     *        name: size
     *        schema:
     *          type: number
     *          required: true
     *          example: 10
     *        description: sessions number per page
     *     responses:
     *       '200':
     *         description: sessions
     *         content:
     *          application/json:
     *              schema:
     *                  $ref: '#/components/schemas/Sessions'
     *              example:
     *                  data:
     *                      -
     *                          id: +79118453479
     *                          auth_key:
     *                              type: Buffer
     *                              data: [134,132,69,117,185,158,10]
     *                          dc_id: 2
     *                          server_address: 149.154.167.51
     *                          port: 443
     *                          active: true
     *                          valid: true
     *                      -
     *                          id: +79118453478
     *                          auth_key:
     *                              type: Buffer
     *                              data: [134,132,69,117,185,158,10]
     *                          dc_id: 2
     *                          server_address: 149.154.167.51
     *                          port: 443
     *                          active: true
     *                          valid: true
     *                  total: 2
     */
    readList: makeRequestHandler(
        ReadSessions,
        (req) => ({
            page: req.query.page,
            size: req.query.size,
        }),
        (result, res) => {
            res.send(result);
        }
    ),
    /**
     * @swagger
     * /sessions:
     *   post:
     *     description: Add telegram session
     *     tags:
     *       - Sessions API
     *     responses:
     *       '200':
     *         content:
     *          application/json:
     *              schema:
     *                  $ref: '#/components/schemas/Session'
     *              example:
     *                 id: 79030165751
     *                 auth_key:
     *                      type: Buffer
     *                      data: [120,54,50,53]
     *                 dc_id: 2
     *                 server_address: 149.154.167.51
     *                 port: 443
     *                 active: true
     *                 valid: true
     */
    add: makeRequestHandler(
        SaveSession,
        (req) => ({
            file: req.file,
        }),
        (result, res) => {
            res.send(result);
        }
    ),
    /**
     * @swagger
     * /sessions/{sessionId}:
     *   delete:
     *     description: Remove session by sessionId
     *     tags:
     *       - Sessions API
     *     parameters:
     *      - in: path
     *        name: sessionId
     *        schema:
     *          type: number
     *          required: true
     *          example: 79030165751
     *     responses:
     *       '200':
     *         content:
     *          application/json:
     *              schema:
     *                  type: object
     *                  properties:
     *                      sessionId:
     *                          type: number
     *              example:
     *                  sessionId: 79030165751
     *       '404':
     *         description: Session with the specified ID was not found.
     *         content:
     *          application/json:
     *              schema:
     *                  $ref: '#/components/schemas/NotFoundError'
     *              example:
     *                  message: Session with id ... not found
     *                  code: NOT_FOUND_ERROR
     */
    del: makeRequestHandler(
        RemoveSession,
        (req) => ({
            sessionId: req.params.sessionId,
        }),
        (result, res) => {
            res.send(result);
        }
    ),
};
